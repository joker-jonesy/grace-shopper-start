import React, { useEffect, useState } from 'react';
import { UserCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import GuestCart from './GuestCart';
import LoginCart from './LoginCart';

const Cart = () => {
	const dispatch = useDispatch();

	const login = useSelector((state) => state.login);
	const localCart = useSelector((state) => state.cart);

	// const getCart = login.loggedIn ? login.user.orders : localCart.cart;
	const cart = login.loggedIn
		? login.user.orders.filter((item) => item.isCart === true)
		: localCart.cart;

	return !cart ? (
		<div>no items found</div>
	) : !login.loggedIn ? (
		<GuestCart />
	) : (
		<LoginCart />
	);
};

export default Cart;
