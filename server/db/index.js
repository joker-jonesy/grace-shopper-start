const conn = require('./connection');
const { Sequelize } = conn;
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem');

User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);

const syncAndSeed = async () => {
	try {
		await conn.sync({ force: false });

		//use this area to sync your database

		console.log(`
		Seeding successful!
	  `);
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	syncAndSeed,
	conn,
	User,
	Tag,
	Order,
	LineItem,
	Product,
};
