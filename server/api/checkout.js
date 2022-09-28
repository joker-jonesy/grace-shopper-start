const router = require('express').Router();
const { Order, User, LineItem, Product } = require('../db');
const stripe = require('stripe')('sk_test_51LmLfPHD1eHRXMIWHRrI5LoUgpSKe3zNS62BgW1sxhkbFstLpNXf8uIOR4AUxwBqEzh09GqbFMn28UFEPTcnJa6e00yzNlrURO');

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

router.post('/create-checkout-session', requireToken, async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: req.body.map((item) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: { name: item.product.name },
						unit_amount: item.product.price,
					},
					quantity: item.quantity,
				};
			}),

			mode: 'payment',
			success_url: `https://ecommercelolcards1.herokuapp.com/succeeded`,
			cancel_url: `https://ecommercelolcards1.herokuapp.com`,
		});

		res.send({ url: session.url });
	} catch (e) {
		console.log(e);
	}
});

// router.post('/webhook', (request, response) => {
// 	const sig = request.headers['stripe-signature'];

// 	let event;

// 	try {
// 		event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
// 	} catch (err) {
// 		response.status(400).send(`Webhook Error: ${err.message}`);
// 		return;
// 	}

// 	// Handle the event
// 	switch (event.type) {
// 		case 'payment_intent.succeeded':
// 			const paymentIntent = event.data.object;
// 			// Then define and call a function to handle the event payment_intent.succeeded
// 			console.log(paymentIntent);
// 			break;
// 		// ... handle other event types
// 		default:
// 			console.log(`Unhandled event type ${event.type}`);
// 	}

// 	// Return a 200 response to acknowledge receipt of the event
// 	response.send();
// });

module.exports = router;
