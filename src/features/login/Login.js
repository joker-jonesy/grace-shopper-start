import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from './loginSlice'

function Login (){
    const [login,setLogin]=useState({})
    const dispatch = useDispatch()

    const handleChange = props =>event=>{
        
        setLogin({
            ...login,
            [props]:event.target.value
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(userLogin(login))
    }
    return(
        <div>
        <h3>
            Welcome please log in!
        </h3>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
                <input type='text' onChange={handleChange('username')} name='username'/>
            <label>Password</label>
                <input type='text' onChange={handleChange('password')} name='password'/>
            <button type='submit'>Login</button>
        </form>
        </div>
    )
}

export default Login