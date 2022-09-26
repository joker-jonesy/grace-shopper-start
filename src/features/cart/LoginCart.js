import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalPrice, addLoginCart, userCart } from './cartSlice';
import { setLoginTotal } from './cartSlice';
import { checkToken } from '../login/loginSlice';
const LoginCart = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login);
	const loginCart = login.user.orders.filter((item) => item.isCart === true);

	const user = useSelector((state) => state.login.user);
	const cart = useSelector((state) => state.cart.cart);

	const totalItem = loginCart[0].lineItems.length;
	const totalPrice = loginCart[0].lineItems.reduce((accum, next) => {
		return accum + Number(next.product.price);
	}, 0);

	React.useEffect(() => {
		dispatch(checkToken());
		dispatch(setLoginTotal(totalItem));
	}, [totalItem]);

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
				loginCart[0].lineItems.map((item) => (
					<div className="cart-item" key={item.product.id}>
						<div className="cart-item-image">
							<img src={item.product.imgCart} alt="" />
						</div>
						<div className="cart-item-info">
							<span> {item.product.name} </span>
							<span> {item.quantity} </span>
							<span> {item.product.price} </span>
						</div>
					</div>
				))
			)}
			<span> Total: ${Math.round(totalPrice * 100) / 100} </span>
			<button> Checkout </button>
		</div>
	);
};

export default LoginCart;
