import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './usersSlice'

function DeleteUser (props){
    const admin = useSelector(state=>state.login)
    const dispatch = useDispatch()
    const [submit, newSubmit] = useState(false)
    useEffect(()=>{},[submit])
    const deleteUser = async (id)=> await axios.delete(`/api/users/${id}`)
    return (
        <button onClick= {async ()=>{
            const answer = window.confirm('Are you sure you want to delete this user?')
            if(answer){await deleteUser(props.user.id)
            await dispatch(fetchUsers(admin.token))
            newSubmit(!submit)}
        }}>Delete!</button>
    )
}
export default DeleteUser