import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalPrice, addLoginCart, userCart } from './cartSlice';
import { setLoginTotal } from './cartSlice';
import { checkToken } from '../login/loginSlice';
import { Link } from 'react-router-dom';
import DeleteItem from './DeleteItem';
import Checkout from './Checkout';
const LoginCart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = useSelector((state) => state.login);
	const loginCart = login.user.orders.filter((item) => item.isCart === true);

	const user = useSelector((state) => state.login.user);
	const cart = useSelector((state) => state.cart.cart);

	const totalItem = loginCart.length ? loginCart[0].lineItems.length : 0;
	const totalPrice = loginCart.length
		? loginCart[0].lineItems.reduce((accum, next) => {
				return accum + Number(next.quantity * next.product.price);
		  }, 0)
		: 0;

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
					loginCart[0].lineItems.map((item, i) => (
						<div
							className="cart-item"
							key={item.product.id}
							style={{
								animationDuration: `${(i + 1) * 0.5}s`,
							}}
						>
							<div className="cart-item-name">
								<Link to={`/cards/${item.product.id}`}>
									<img
										className="cart-image"
										src={item.product.imgCart}
										alt=""
									/>
									<div className="image-name"> {item.product.name} </div>
								</Link>
							</div>
							<div className="cart-item-qty"> {item.quantity} </div>
							<div className="cart-item-price">
								{' '}
								{(item.quantity * item.product.price) / 100}{' '}
							</div>
							<DeleteItem lineItem={item} user={user} />
						</div>
					))
				)}
			</div>

			<span> Total: ${Math.round(totalPrice) / 100} </span>
			<Checkout />
		</div>
	);
};

export default LoginCart;
