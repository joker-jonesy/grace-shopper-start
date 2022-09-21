import React,{useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Login from '../login/Login';
import {fetchCards, fetchSingleCard } from '../cards/cardsSlice';


const Profile = () => {
	const user = useSelector(state=>state.login.user)
	const dispatch = useDispatch()
	const cards = useSelector(state=>state.cards.cards)
	useEffect(()=>{
		dispatch(fetchCards())
	},[])

	return <div className='rest'>
		{!user.id ? <Login/>:
		<div>
		<h2>
			Welcome {user.fName} {user.lName}
		</h2>
		<h4>Previous Orders:</h4>
		<div>{user.orders.map(order=>{
			if(!order.isCart){
				return(
					<div>
					<p key ={order.id}>Shipped To: {order.orderStreet} {order.orderCity} 
					{order.orderState} {order.orderZip} {order.orderCountry} </p></div>
				)
			}
		})}</div>
		</div>}
	</div>;
};

export default Profile;
