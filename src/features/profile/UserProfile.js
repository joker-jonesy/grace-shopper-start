// import React from "react"
// import { useDispatch } from "react-redux";

// import { logout } from '../login/loginSlice';

// function UserProfile (){
// 	const user = useSelector(state=>state.login.user)
// 	const dispatch = useDispatch()
//     return(<div>
// 		<h2>
// 			Welcome {user.fName} {user.lName}
// 		</h2>
// 		<button onClick={()=>{dispatch(logout())}}>
// 			Logout
// 		</button>

// 		{user.orders.length ? <div>
// 			<h4>Previous Orders:</h4>
// 		<div>{user.orders.map(order=>{
// 			if(!order.isCart){
// 				return(
// 					<div key={order.id}>
// 					{order.lineItems.map(product=>
// 					<div key={product.id}>{product.quantity} <img src={product.product.imgAll}  alt='' />
// 					</div>)}

// 					<p>Shipped To: {order.orderStreet} {order.orderCity}
// 					{order.orderState} {order.orderZip} {order.orderCountry} </p></div>
// 				)
// 			}
// 		})}</div>
// 		</div>:null}
// 		</div>)
// }

// export default UserProfile
