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
		<div className="cart">
			<h1> {user.username} items: </h1>
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
					loginCart[0].lineItems.map((item) => (
						<div
							className="cart-item"
							key={item.product.id}
							style={{
								animationDuration: `${(i + 1) * 0.5}s`,
							}}
						>
							<div className="cart-item-name">
								<img className="cart-image" src={item.product.imgCart} alt="" />
								<div className="image-name"> {item.product.name} </div>
							</div>
							<div className="cart-item-qty"> {item.quantity} </div>
							<div className="cart-item-price"> {item.product.price} </div>
							<button className="cart-delete-button">Delete</button>
						</div>
					))
				)}
			</div>

			<span> Total: ${Math.round(totalPrice * 100) / 100} </span>
			<button> Checkout </button>
		</div>
	);
};

export default LoginCart;
