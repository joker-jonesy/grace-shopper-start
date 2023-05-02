import React from 'react';
import { useSelector } from 'react-redux';

function ViewOrders() {
	const admin = useSelector((state) => state.login);
	const orders = useSelector((state) => state.orders.orders);
	return (
		<div className="view-orders-container">
			{admin.user.isAdmin ? (
				!orders.length ? (
					<h1>loading</h1>
				) : (
					<div className='login-box-wrapper'>
						{orders.map((order) => (
							<ul className='user-info-list' key={order.id}>
								<li className='user-item'>
									Create By: {order.user.fName} {order.user.lName}
								</li>
								<li className='user-item'>Email associated with order {order.user.email}</li>
								<li className='user-item'>Order ID:{order.id}</li>
								<li className='user-item'>Date:{order.createdAt}</li>
								<li className='user-item'>{order.orderStreet}</li>
								<li className='user-item'>{order.orderState}</li>
								<li className='user-item'>{order.orderCountry}</li>
								<li className='user-item'>{order.orderZip}</li>
								<p>Bought these Cards:</p>
								<div>
									{order.lineItems.map((product) => (
										<li key={product.id}>{product.product.name}</li>
									))}
								</div>
								<hr />
							</ul>
						))}
					</div>
				)
			) : (
				<h1>Access Denied</h1>
			)}
		</div>
	);
}
export default ViewOrders;
