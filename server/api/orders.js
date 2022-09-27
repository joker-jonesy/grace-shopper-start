const router = require('express').Router();
const { Order, User, LineItem, Product } = require('../db');

const requireToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization;
		const user = await User.byToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

router.get('/', requireToken, async (req, res, next) => {
	try {
		let orders = await Order.findAll({
			where: {
				isCart: false,
			},
			include: [
				{ model: User },
				{ model: LineItem, include: [{ model: Product }] },
			],
		});
		res.send(orders);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const order = await Order.findOrCreate({
			where: { userId: req.params.id, isCart: true },
			include: [{ model: LineItem, include: Product }],
		});
		await LineItem.findOne({
			where: { orderId: order[0].id, productId: req.body.card.id },
		}).then((obj) => {
			if (obj) obj.update({ quantity: obj.quantity + req.body.qty });
			else {
				return LineItem.create({
					orderId: order[0].id,
					productId: req.body.card.id,
					quantity: req.body.qty,
				});
			}
		});
		const count = await LineItem.count({ where: { orderId: order[0].id } });

		res.send({ count });
	} catch (e) {
		next(e);
	}
});

router.put('/:userId/processOrder', requireToken, async (req, res, next) => {
	try {
		const order = await Order.findOne({
			where: { userId: req.params.userId, isCart: true },
		});
		console.log(order);
		order && (await order.update({ isCart: false }));
		req.body.map(async (item) => {
			const product = await Product.findByPk(item.id);
			await product.update({
				where: { quantity: product.quantity - item.quantity },
			});
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
