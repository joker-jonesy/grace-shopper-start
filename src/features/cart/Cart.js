import React, { useEffect, useState } from 'react';
import { UserCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import GuestCart from './GuestCart';

const Cart = () => {
	const dispatch = useDispatch();

	const login = useSelector((state) => state.login);
	const localCart = useSelector((state) => state.cart);

	// const getCart = login.loggedIn ? login.user.orders : localCart.cart;
	const cart = login.loggedIn
		? login.user.orders.filter((item) => item.isCart === true)
		: localCart.cart;

	let totalPrice = 0;
	let totalQty = 0;

	return !cart ? (
		<div>no items found</div>
	) : !login.loggedIn ? (
		<GuestCart />
	) : (
		<div className="rest">
			<div className="temp-cart-div">
				<h1> user's cart</h1>
				<div>
					<div className="cart-item">
						<h5>item</h5>
						<h5>qty</h5>
						<h5>price</h5>
					</div>
					<div>
						{cart[0].lineItems.map((cartItem) => {
							totalQty += cartItem.quantity;
							totalPrice += Number(cartItem.product.price) * cartItem.quantity;

							return (
								<div className="cart-item" key={cartItem.product.id}>
									<div className="cart-img-name">
										<h5>{cartItem.product.name}</h5>
										<img className="cart-img" src={cartItem.product.imgCart} />
									</div>
									<div className="qty-button">
										{/* <button onClick={removeFromQty}>-</button> */}
										<h5>{cartItem.quantity}</h5>
										{/* <button onClick={addToQty}>+</button> */}
									</div>
									<h5>${Number(cartItem.product.price) * cartItem.quantity}</h5>
								</div>
							);
						})}
					</div>
				</div>
				<div className="cart-item">
					<h5>all items</h5>
					<h5>{totalQty}</h5>
					<h5>${totalPrice}</h5>
				</div>
				<button>checkout</button>
			</div>
		</div>
	);
};

export default Cart;
