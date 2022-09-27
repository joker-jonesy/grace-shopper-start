import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../login/loginSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchOrders } from './ordersSlice';
import { fetchUsers } from './usersSlice';
import { fetchCards } from '../cards/cardsSlice';

function AdminProfile() {
	const dispatch = useDispatch();

	let admin = useSelector((state) => state.login);

	useEffect(() => {
		if (admin.user.isAdmin) {
			dispatch(fetchOrders(admin.token));
			dispatch(fetchUsers(admin.token));
			dispatch(fetchCards());
		}
	});

	return (
		<div className="admin-profile-container">
			{admin.user.isAdmin ? (
				<div>
					<h4>
						Welcome Administrator {admin.user.fName} {admin.user.lName}
					</h4>
					<Link to="/admin/viewOrders">
						<p>View Completed Orders</p>
					</Link>
					<Link to="/admin/viewUsers">
						<p>View all users</p>
					</Link>
					<Link to="/admin/createCard">
						<p>Create new Card</p>
					</Link>
					<Link to="/admin/editCard">
						<p>Update or Delete a Product</p>
					</Link>
					<button
						onClick={() => {
							dispatch(logout());
						}}
					>
						Logout
					</button>
				</div>
			) : null}
		</div>
	);
}

export default AdminProfile;
