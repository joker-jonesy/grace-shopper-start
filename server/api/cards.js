const router = require('express').Router();
const { Product } = require('../db');

// GET /api/cards

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
router.post('/', requireToken, async (req,res,next)=>{
	try{
		console.log(req.body)
		const newCard = await Product.create(req.body)
		res.status(201).send(newCard)
	}catch(error){next(error)}
})

//delete /api/cards/:id
router.delete('/:id', requireToken, async (req,res,next)=>{
	try {
		const card = await Product.findByPk((req.params.id))
		await card.destroy()
		res.send(card)
	}catch(error){next(error)}
})
//update or put /api/cards/:id
router.put('/:id', requireToken, async (req,res,next)=>{
	try{
		const card = await Product.findByPk((req.params.id))
		await card.update(req.body)
		const updatedCard = await Product.findByPk((req.params.id))
		res.send(updatedCard)
	}catch(error){next(error)}
})

module.exports = router;
