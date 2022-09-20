const conn = require('../connection');
const { Sequelize } = conn;

const Product = conn.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
	},
	qty: {
		type: Sequelize.INTEGER,
	},
	imgSingle: {
		type: Sequelize.STRING,
	},
	imgAll: {
		type: Sequelize.STRING,
	},
	imgCart: {
		type: Sequelize.STRING,
	},
	descriptionBlurb: {
		type: Sequelize.TEXT,
	},
	descriptionLore: {
		type: Sequelize.TEXT,
	},
});

module.exports = Product;
