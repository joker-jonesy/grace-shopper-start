import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AdminProfile from '../admin/AdminProfile';
import Login from '../login/Login';
import { logout } from '../login/loginSlice';
import { Link } from 'react-router-dom';
import { clearCart, setLoginTotal } from '../cart/cartSlice';

const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.login.user);

	return (
		<div className="view-profile-container">
			{!user.id ? (
				<Login />
			) : user.isAdmin ? (
				<AdminProfile />
			) : (
				<div className="user-profile">
					<div className='login-box-wrapper'>
					<h2>Welcome, {user.username}!</h2>
					<div className="user-info">
						<div className="user-name user">
							{user.fName} {user.lName}
						</div>
						<div className="user-email user">{user.email}</div>
					</div>
					<button className='login-button'
						onClick={() => {
							dispatch(logout())
							dispatch(setLoginTotal(0))
							dispatch(clearCart())
						}}
					>
						Logout
					</button>
					</div>
					<Link to="/profile/updateProfile">
						<h4>Update Your Profile/Password</h4>
					</Link>
					{user.orders.length ? (
						<div className='user-box-wrapper'>
							<h4>Previous Orders:</h4>
							<div>
								{user.orders.map((order) => {
									if (!order.isCart) {
										return (
											<div key={order.id}>
												<p>
													Shipped To: {order.orderStreet} {order.orderCity}
													{order.orderState} {order.orderZip}{' '}
													{order.orderCountry}{' '}
												</p>
												{order.lineItems.map((product) => (
													<div key={product.id}>
														<div>
															{product.product.name}, Qty: {product.quantity}
														</div>
														{/* {product.quantity}{' '} */}
														<img
															className="previous-order-image"
															src={product.product.imgCart}
															alt=""
														/>
													</div>
												))}
											</div>
										);
									}
								})}
							</div>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};

export default Profile;
