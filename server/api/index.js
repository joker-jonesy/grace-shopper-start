const router = require('express').Router();

router.use('/cards', require('./cards'));

router.use('/auth', require('./auth'));
router.use('/signUp', require('./signUp'));
router.use('/orders', require('./orders'));
router.use('/lineItem', require('./lineItem'));
router.use('/users', require('./users'));
router.use('/checkout', require('./checkout'));

router.use((req, res, next) => {
	const err = new Error('API route not found!');
	err.status = 404;
	next(err);
});

module.exports = router;
