import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../login/loginSlice";


function UpdateUser (){
    const login = useSelector(state=>state.login)
    const user = login.user
    const dispatch = useDispatch()
    const [editUser, setEditUser] = useState({id:user.id})
    const [submit,newSubmit] = useState(false)
    useEffect(()=>{},[submit])

    const handleChange = props => event=>{
        setEditUser({
            ...editUser,
            [props]:event.target.value
        })
    }
    const updateUser = async (user, token)=>{
        let {data} = await axios.put(`/api/auth/${user.id}`,user,{
            headers:{
                authorization:token
            }
        })
        return data
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        await updateUser(editUser, login.token)
        await dispatch(fetchUser(login.token))
        newSubmit(!submit)
    }

    return(
        <div className='update-user-container'>
            {!login.loggedIn? <h1>Please Login to view page</h1> :
            <div className='form-container'>
                <h3>Please use the following form Edit your profile</h3>
                <form onSubmit={handleSubmit} className='form'>
                    <label className='form-label'>First Name: {user.fName}</label>
                        <input className='form-element' type='text' onChange={handleChange('fName')} placeholder={user.fName}/>
                    <label className='form-label'>Last Name: {user.lName}</label>
                        <input className='form-element' type='text' onChange={handleChange('lName')} placeholder={user.lName}/>
                    <label className='form-label'>Email: {user.email}</label>
                        <input className='form-email-element' type='text' onChange={handleChange('email')} placeholder={user.email}/>
                    <label className='form-label'>Username: {user.username}</label>
                        <input className='form-element' type='text' onChange={handleChange('username')} placeholder={user.username}/>
                    <button className='form-button' type='submit'>Edit your profile</button>
                </form>
            </div>}
        </div>
    )
}

export default UpdateUser