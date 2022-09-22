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

//post /api/cards
router.post('/', async (req,res,next)=>{
	try{
		console.log(req.body)
		const newCard = await Product.create(req.body)
		res.status(201).send(newCard)
	}catch(error){next(error)}
})

module.exports = router;
