import React, { useEffect, useState } from 'react';
import { addLoginCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import GuestCart from './GuestCart';
import LoginCart from './LoginCart';
import { updateOrder } from './cartSlice';
const Cart = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login);
	const localCart = useSelector((state) => state.cart);

	// const getCart = login.loggedIn ? login.user.orders : localCart.cart;
	const cart = login.loggedIn
		? login.user.orders.filter((item) => item.isCart === true)
		: localCart.cart;

	useEffect(() => {
		login.loggedIn &&
			localCart.cart.length > 0 &&
			localCart.cart.map((item) => {
				console.log('ITEM', `item`);
				dispatch(updateOrder({ token: login.token, user: login.user, item }));
			});
		// login.loggedIn &&
		// 	localCart.cart.length < 1 &&
		// 	login.user.orders[1].lineItems.map((item) =>
		// 		dispatch(addLoginCart(item))
		// 	);
	}, []);

	return !cart ? (
		<div>no items found</div>
	) : !login.loggedIn ? (
		<GuestCart />
	) : (
		<LoginCart />
	);
};

export default Cart;
