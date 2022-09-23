import React from 'react';
import { useSelector } from 'react-redux';
import { getTotalPrice } from './cartSlice';
const GuestCart = () => {
	const guestCart = useSelector((state) => state.cart);
	const totalItem = useSelector((state) => state.cart.totalItems);
	const totalPrice = useSelector(getTotalPrice);

	return (
		<div className="cart-container">
			<h1> User's items: </h1>
			<div className="cart-item-header">
				<span>item</span>
				<span>qty</span>
				<span>price</span>
			</div>
			{totalItem < 1 ? (
				<h1> Empty Cart </h1>
			) : (
				guestCart.cart.map((item) => (
					<div className="cart-item" key={item.card.id}>
						<div className="cart-item-image">
							<img src={item.card.imgCart} alt="" />
						</div>
						<div className="cart-item-info">
							<span> {item.card.name} </span>
							<span> {item.qty} </span>
							<span> {item.price} </span>
						</div>
					</div>
				))
			)}
			<span> Total: {totalPrice} </span>
			<button> Checkout </button>
		</div>
	);
};

export default GuestCart;
