import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalPrice, addLoginCart } from './cartSlice';

const LoginCart = () => {
	const dispatch = useDispatch();

	const login = useSelector((state) => state.login);
	const loginCart = login.user.orders.filter((item) => item.isCart === true);

	const user = useSelector((state) => state.login.user);
	const cart = useSelector((state) => state.cart.cart);
	const totalItem = useSelector((state) => state.cart.totalItems);
	const totalPrice = useSelector(getTotalPrice);

	React.useEffect(() => {
		// dispatch(addLoginCart(loginCart.lineItems));
	}, []);
	return (
		<div className="cart-container">
			<h1> {user.username} items: </h1>
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

export default LoginCart;
