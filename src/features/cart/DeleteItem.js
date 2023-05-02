import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	setLoginTotal,
	updateOrder,
	deleteUserItem,
	deleteItem,
	getTotalPrice,
} from './cartSlice';
import { fetchUser } from '../login/loginSlice';

const DeleteItem = ({ id, lineItem, user }) => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login);

	const handleDelete = () => {
		(login.loggedIn &&
			dispatch(deleteUserItem({ lineItem, token: login.token })) &&
			dispatch(fetchUser(login.token))) ||
			(dispatch(deleteItem(id)) && dispatch(getTotalPrice()));
	};

	return (
		<button className="cart-delete-button" onClick={handleDelete}>
			Remove from cart
		</button>
	);
};

export default DeleteItem;
