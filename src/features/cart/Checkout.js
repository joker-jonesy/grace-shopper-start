import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutOrder } from './cartSlice';
const Checkout = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login);
	const loginCart = login.user.orders.filter((item) => item.isCart === true);

	const handleCheckout = async () => {
		loginCart.length<1
			? dispatch(
					checkoutOrder({
						token: login.token,
						user: login.user,
						cart: loginCart[0].lineItems,
					})
			  )
			: alert(' Cart is Empty ');
	};

	return <button onClick={handleCheckout}>Checkout</button>;
};

export default Checkout;
