import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../login/loginSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrders } from "./ordersSlice";
import {fetchUsers} from './usersSlice'

function AdminProfile (){
    const dispatch = useDispatch()

    let admin = useSelector(state=>state.login)
    useEffect(()=>{
        if(admin.user.isAdmin){
        dispatch(fetchOrders(admin.token))
        dispatch(fetchUsers(admin.token))}
    })

    return (
        <div>
            {admin.user.isAdmin ? <div>
            <h4>Welcome Administrator {admin.user.fname} {admin.user.lname}</h4>
                <Link to ='/admin/viewOrders'>
                <p>View Completed Orders</p>
                </Link>
                <Link to = '/admin/viewUsers'>
                    <p>View all users</p>
                </Link>
                <Link to ='/admin/createCard'>
                <p>Create new Card</p>
                </Link>
                <p>Update a Product</p>
                <button onClick={()=>{dispatch(logout())}}>
			        Logout
		        </button>
            </div>
            :null}

        </div>
    )
}

export default AdminProfile