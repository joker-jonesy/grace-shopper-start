const conn = require('../connection');
const { Sequelize } = conn;
//jwt auth imported here

const User = conn.define('user', {
	username: {
		type: Sequelize.STRING(32),
		unique: true,
		validate: {
			allowNull: false,
			len: [6, 32],
		},
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			allowNull: false,
		},
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		validate: {
			isEmail: true,
			allowNull: false,
		},
	},
	fName: {
		type: Sequelize.STRING(64),
		validate: {
			allowNull: false,
		},
	},
	lName: {
		type: Sequelize.STRING(64),
		validate: {
			allowNull: false,
		},
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

//create authentication

User.prototype.getCart = async function () {};

User.prototype.addToCart = async function () {
	//    grab the order associated with the user
	//    orders are your cart
};

User.prototype.removeFromCart = async function () {};

//coverting order model from cart to actual placed order
User.prototype.createOrder = async function () {};

module.exports = User;
