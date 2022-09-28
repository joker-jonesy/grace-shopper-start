import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, updateLineItem, getTotalPrice } from './cartSlice';
import { fetchUser } from '../login/loginSlice';

function ChooseQuantity({ lineItem }) {
	const selectQty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const dispatch = useDispatch();
	const qty = lineItem.qty || lineItem.quantity;
	const login = useSelector((state) => state.login);
	React.useEffect(() => {}, [lineItem]);
	const handleChange = async (event) => {
		(login.loggedIn &&
			dispatch(
				updateLineItem({
					lineItem,
					qty: event.target.value,
					token: login.token,
				})
			) &&
			dispatch(fetchUser(login.token))) ||
			(dispatch(
				updateQuantity({ id: lineItem.card.id, qty: event.target.value })
			) &&
				dispatch(getTotalPrice()));
	};
	console.log(lineItem.qty);

	return (
		<div className="quantity-container">
			<select value={qty > 10 ? 10 : qty} onChange={handleChange}>
				{selectQty.map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</select>
		</div>
	);
}

export default ChooseQuantity;
