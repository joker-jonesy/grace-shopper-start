import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { userLogin } from './loginSlice'
import { Link } from 'react-router-dom'

function Login (){
    const [login,setLogin]=useState({})
    const dispatch = useDispatch()
    const handleChange = props =>event=>{ 
        setLogin({
            ...login,
            [props]:event.target.value
        })
    }
    const [message, setMessage]=useState('')
    const handleSubmit = (event)=>{
        event.preventDefault()
        setMessage('')
        const user = dispatch(userLogin(login))
        if(!user.id){
            setMessage('invalid username or password')
        }
    }
    return(
        <div className='rest login'>
        <h3>
            Welcome, please log in!
        </h3>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
                <input type='text' onChange={handleChange('username')} required name='username'/>
            <label>Password</label>
                <input type='password' onChange={handleChange('password')} required name='password'/>
            <button type='submit'>Login</button>
        </form>
        <div>{message}</div>
        <Link to='/signUp'><h3>Sign Up</h3></Link>
        </div>
    )
}

export default Login;