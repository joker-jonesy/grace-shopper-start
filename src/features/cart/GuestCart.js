import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalPrice } from './cartSlice';
import DeleteItem from './DeleteItem';
import { currencyFormat } from '../util/utils';

const GuestCart = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart.cart);
	const totalItem = useSelector((state) => state.cart.totalItems);
	const totalPrice = useSelector(getTotalPrice);

	const handleLogin = () => {
		navigate('/profile');
	};
	return (
		<div className="cart">
			<h1> Guest's items: </h1>
			<div className="cart-item-header">
				<span className="header-element">item</span>
				<span className="header-element">qty</span>
				<span className="header-element">price</span>
				<span className="header-element">
					<div></div>
				</span>
			</div>
			<div className="cart-container">
				{totalItem < 1 ? (
					<h1> Empty Cart </h1>
				) : (
					cart.map((item, i) => (
						<div
							className="cart-item"
							key={item.card.id}
							style={{
								animationDuration: `${(i + 1) * 0.5}s`,
							}}
						>
							<div className="cart-item-name">
								<Link to={`/cards/${item.card.id}`}>
									<img className="cart-image" src={item.card.imgCart} alt="" />
								</Link>
								<div className="image-name"> {item.card.name} </div>
							</div>
							<div className="cart-item-qty"> {item.qty} </div>
							<div className="cart-item-price">
								{' '}
								{currencyFormat(item.price)}{' '}
							</div>
							<DeleteItem id={item.card.id} />
						</div>
					))
				)}
			</div>
			<div className="cart-price"> Total: {currencyFormat(totalPrice)} </div>
			<button> Checkout </button>
		</div>
	);
};

export default GuestCart;
