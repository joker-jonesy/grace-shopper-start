import React from "react";
import { useSelector } from "react-redux";
import DeleteUser from "./DeleteUser";

function ViewUsers (){
    const admin = useSelector(state=>state.login)
    const users = useSelector(state=>state.users.users)
    return(<div className='view-users-container'>
        {admin.user.isAdmin ? !users.length ? <h1>loading</h1> : 
        <div>
            {users.map(user=><div key={user.id}>
                <p>{user.fName} {user.lName}</p>
                <p>username: {user.username}</p>
                <p>email: {user.email}</p>
                <p>userId: {user.id}</p>
                <p>is an Admin?: {user.isAdmin ? 'true' :'false'}</p>
                <DeleteUser user={user}/>
                <hr/>
            </div>)}
        </div>
        :<h1>Access Denied</h1>}
        </div>
    )
}
export default ViewUsers