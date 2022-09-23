import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AdminProfile from '../admin/AdminProfile';
import Login from '../login/Login';
import { logout, checkToken } from '../login/loginSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
	const user = useSelector((state) => state.login.user);
	useEffect(() => {
		dispatch(checkToken());
	}, []);

	const dispatch = useDispatch();

	return (
		<div className="view-profile-container">
			{!user.id ? (
				<Login />
			) : user.isAdmin ? (
				<AdminProfile />
			) : (
				<div>
					<h2>
						Welcome {user.fName} {user.lName}
					</h2>
					<button
						onClick={() => {
							dispatch(logout());
						}}
					>
						Logout
					</button>
					<Link to="/profile/updateProfile">
						<h4>Update Your Profile/Password</h4>
					</Link>
					{user.orders.length ? (
						<div>
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
														{product.quantity}{' '}
														<img src={product.product.imgAll} alt="" />
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
