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
		champions.map(async (champion) => {
			await Product.create({
				name: champion.name,
				price: setRandomPrice(),
				qty: 100,
				descriptionBlurb: champion.blurb,
				imgAll: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`,
				imgSingle: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
				imgCart: `http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/${champion.id}.png`,
				tag1: champion.tags[0],
				tag2: champion.tags[1] ? champion.tags[1] : null,
			});
		});
		//use this area to sync your database
	
	let admin = await User.create({
		username: 'admin',
		email: 'admin@gmail.com',
		password: 'admin',
		fName: 'Jr.',
		lName: 'Administrator',
		isAdmin: true
	})

	let sally = await User.create({
		username: 'sally12',
		email: 'sally1259201@gmail.com',
		password: 'asdf',
		fName: 'Sally',
		lName: 'Fields',
		isAdmin: false,
	})

	let order1 = await Order.create({
		isCart:false,
		orderStreet: '10502 big street',
		orderCity: 'Sprinfield',
		orderZip: '22902',
		orderState: 'VA',
		orderCountry: 'USA',
		userId: sally.id
	})

	let order2 = await Order.create({
		isCart: true,
		userId: sally.id
	})

	let orderItems = await LineItem.bulkCreate([
		{orderId: order1.id, productId:1, quantity:1},
		{orderId: order1.id, productId:6, quantity:3},
		{orderId: order1.id, productId:5, quantity:1},
		{orderId: order1.id, productId:4},
		{orderId: order1.id, productId:3},
		{orderId: order1.id, productId:2},
		{orderId:order2.id, productId:10},
		{orderId:order2.id, productId:102, quantity:2},
		{orderId:order2.id, productId:115}
	])

		//use this area to sync your database
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
