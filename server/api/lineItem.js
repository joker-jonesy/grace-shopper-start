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
router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const lineItem = await LineItem.findByPk(req.params.id);
		await lineItem.update({ quantity: req.body.qty });
	} catch (e) {
		next(e);
	}
});
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		const lineItem = await LineItem.findByPk(req.params.id);
		const orderId = lineItem.orderId;

		const deleteItem = await lineItem.destroy();
		const count = await LineItem.count({ where: { orderId } });
		res.send({ count, deleteItem });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
