const conn = require('../connection');
const { Sequelize } = conn;

const Product = conn.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.INTEGER,
	},
	qty: {
		type: Sequelize.INTEGER,
	},
	imgSingle: {
		type: Sequelize.STRING,
		defaultValue: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yuumi_0.jpg'
	},
	imgAll: {
		type: Sequelize.STRING,
		defaultValue: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Yuumi_0.jpg`
	},
	imgCart: {
		type: Sequelize.STRING,
		defaultValue: 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/Yuumi.png'
	},	
	descriptionBlurb: {
		type: Sequelize.TEXT,
	},
	tag1: {
		type: Sequelize.TEXT(32),
	},
	tag2: {
		type: Sequelize.TEXT(32),
	},
});

module.exports = Product;
