import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalPrice } from './cartSlice';
const GuestCart = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart.cart);
	const totalItem = useSelector((state) => state.cart.totalItems);
	const totalPrice = useSelector(getTotalPrice);
	const handleLogin = () => {
		navigate('/profile');
	};
	return (
		<div className="cart-container">
			<h1> User's items: </h1> <button onClick={handleLogin}> Login </button>
			<div className="cart-item-header">
				<span>item</span>
				<span>qty</span>
				<span>price</span>
			</div>
			{totalItem < 1 ? (
				<h1> Empty Cart </h1>
			) : (
				cart.map((item) => (
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
