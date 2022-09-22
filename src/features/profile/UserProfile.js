import React from 'react';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import Login from '../login/Login';
import { logout } from '../login/loginSlice';



const UserProfile = () => {
	const user = useSelector(state=>state.login.user)
	const dispatch = useDispatch()

	return <div>
		{!user.id ? <Login/>:
		<div>
		<h2>
			Welcome {user.fName} {user.lName}
		</h2>
		<button onClick={()=>{dispatch(logout())}}>
			Logout
		</button>
		
		{user.orders.length ? <div>
			<h4>Previous Orders:</h4>
		<div>{user.orders.map(order=>{
			if(!order.isCart){
				return(
					<div key={order.id}>
					{order.lineItems.map(product=>
					<div key={product.id}>{product.quantity} <img src={product.product.imgAll}  alt='' />
					</div>)}
					
					<p>Shipped To: {order.orderStreet} {order.orderCity} 
					{order.orderState} {order.orderZip} {order.orderCountry} </p></div>
				)
			}
		})}</div>
		</div>:null}
		</div>}
	</div>;
};

export default UserProfile;
