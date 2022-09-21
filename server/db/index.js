const conn = require('./connection');
const { Sequelize } = conn;
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem');
const axios = require('axios');

User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);

const getChampions = async () => {
	let { data } = await axios.get(
		'http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json'
	);
	let championArr = Object.values(data.data);
	return championArr;
};
const setRandomPrice = () => {
	return Math.floor(Math.random() * 100000) / 100;
};

const syncAndSeed = async () => {
	try {

		const getChampions = async () => {
			let { data } = await axios.get(
				'http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json'
			);
			let championArr = Object.values(data.data);
			return championArr;
		};
		const setRandomPrice = () => {
			return Math.floor(Math.random() * 100000) / 100;
		};
		//change to true to reseed
		await conn.sync({ force: true });

		let champions = await getChampions();
		let tags = await Tag.bulkCreate([
			{ name: 'Fighter' },
			{ name: 'Tank' },
			{ name: 'Mage' },
			{ name: 'Assassin' },
			{ name: 'Tank' },
			{ name: 'Support' },
			{ name: 'Mage' },
			{ name: 'Marksman' },
		]);
		
		await Promise.all(
		champions.map(async (champion) => {
			await Product.create({
				name: champion.name,
				price: setRandomPrice(),
				qty: 100,
				descriptionBlurb: champion.blurb,
				imgAll: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name.trim()}_0.jpg`,
				imgSingle: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name.trim()}_0.jpg`,
				imgCart: `http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/${champion.name.trim()}.png`,
				tag1: champion.tags[0],
				tag2: champion.tags[1] ? champion.tags[1] : null,
			});
		}))
		console.log(`Seeding successful!`);
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
