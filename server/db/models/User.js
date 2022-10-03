const conn = require('../connection');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = conn.define('user', {
	username: {
		type: Sequelize.STRING(32),
		unique: true,
		allowNull: false,
		validate: {
			len: [5, 32],
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	fName: {
		type: Sequelize.STRING(64),
		allowNull: false,
	},
	lName: {
		type: Sequelize.STRING(64),
		allowNull: false,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

//create authentication

User.prototype.getCart = async function () {
	try {
	} catch (err) {
		console.log(err);
	}
};

User.prototype.addToCart = async function () {
	//    grab the order associated with the user
	//    orders are your cart
};

User.prototype.removeFromCart = async function () {};

//coverting order model from cart to actual placed order
User.prototype.createOrder = async function () {};

User.prototype.generateToken = async function () {
	try {
		const token = await jwt.sign({ id: this.id }, process.env.JWT);
		return token;
	} catch (err) {
		console.log(err);
	}
};

User.byToken = async function (token) {
	try {
		const payload = await jwt.verify(token, process.env.JWT);
		if (payload) {
			const user = await User.findByPk(payload.id);
			return user;
		}
		const error = Error('bad credentials');
		error.status = 401;
		throw error;
	} catch (ex) {
		const error = Error('bad credentials');
		error.status = 401;
		throw error;
	}
};
User.authenticate = async ({ username, password }) => {
	const user = await User.findOne({
		where: {
			username,
		},
	});
	const match = await bcrypt.compare(password, user.password);
	if (match) {
		return user;
	}
	const error = Error('bad credentials');
	error.status = 401;
	throw error;
};

User.addHook('beforeCreate', async (user) => {
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, 3);
	}
});
User.addHook('beforeUpdate', async (user) => {
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, 3);
	}
});

module.exports = User;
