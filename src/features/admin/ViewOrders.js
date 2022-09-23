import React from "react";
import { useSelector, useDispatch } from "react-redux";

function ViewOrders (){
    const admin = useSelector(state=>state.login)
    const orders = useSelector(state=>state.orders.orders)
    return(<div className='view-orders-container'>
        {admin.user.isAdmin ? !orders.length ? <h1>loading</h1> : <div>
            {orders.map(order => <ul key={order.id}>
                <li>Create By: {order.user.fName} {order.user.lName}</li>
                <li>Email associated with order {order.user.email}</li>
                <li>Order ID:{order.id}</li>
                <li>Date:{order.createdAt}</li>
                <li>{order.orderStreet}</li>
                <li>{order.orderState}</li>
                <li>{order.orderCountry}</li>
                <li>{order.orderZip}</li>
                <p>Bought these Cards:</p>
                <div>
                {order.lineItems.map(product=>
                <li key={product.id}>{product.product.name}</li>
                    )}</div><hr/>
            </ul>)}
            
        </div>
        :<h1>Access Denied</h1>}
        </div>
    )
}
export default ViewOrders