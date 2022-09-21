const router = require('express').Router();
const { Product } = require('../db');

// GET /api/cards

router.get('/', async (req, res, next) => {
	try {
		const product = await Product.findAll();
		res.send(product);
	} catch (e) {
		next(e);
	}
});

// GET /api/cards/:id
router.get('/:id', async (req, res, next) => {
	try {
		const singleProduct = await Product.findByPk(req.params.id);
		res.send(singleProduct);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
