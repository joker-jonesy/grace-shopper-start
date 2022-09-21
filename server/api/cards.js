const router = require('express').Router();
const { Product } = require('../db');

// GET /api/products

router.get('/', async (req, res, next) => {
	try {
		const product = await Product.findAll();
		res.send(product);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
