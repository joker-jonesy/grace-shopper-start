import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processOrder } from '../features/cart/cartSlice';
const PaymentRecieve = () => {
	const dispatch = useDispatch();

	const login = useSelector((state) => state.login);
	const loginCart = login.user.orders.filter((item) => item.isCart === true);

	React.useEffect(() => {
		dispatch(
			processOrder({
				token: login.token,
				user: login.user,
				lineItems: loginCart[0].lineItems,
			})
		);
	}, []);
	return <div>PaymentRecieve</div>;
};

export default PaymentRecieve;
