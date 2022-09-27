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
        <div className='admin-profile-container'>
            {admin.user.isAdmin ? <div>
            <h4>Welcome Administrator {admin.user.fName} {admin.user.lName}</h4>
            <ul className='admin-profile-links'>
                <Link to ='/admin/viewOrders'>
                <li className='admin-profile-links'>View Completed Orders</li>
                </Link>
                <Link to = '/admin/viewUsers'>
                <li className='admin-profile-links'>View all users and delete a user</li>
                </Link>
                <Link to ='/admin/createCard'>
                <li className='admin-profile-links'>Create new Card</li>
                </Link>
                <Link to = '/admin/editCard'>
                <li className='admin-profile-links'>Update or Delete a Card</li>
                </Link>
            </ul>
                <button onClick={()=>{dispatch(logout())}}>
			        Logout
		        </button>
            </div>
            :null}
		</div>
	)
}

export default AdminProfile;
