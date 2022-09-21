import React, {useState} from 'react'
import axios from 'axios'

function SignUp (){
    const [signUp,setSignUp]=useState({isAdmin:false})

    const handleChange = props => event=>{
        setSignUp({
            ...signUp,
            [props]:event.target.value
        })
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        let newUser = axios.post('/api/signUp', signUp)
        return newUser
    }
    return(
        <div className='rest'>
            <h3>Please use the following form to Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                    <input type='text' onChange={handleChange('fName')} name='fName'/>
                <label>Last Name</label>
                    <input type='text' onChange={handleChange('lName')} name='lName'/>
                <label>Email</label>
                    <input type='text' onChange={handleChange('email')} name='email'/>
                <label>Username</label>
                    <input type='text' onChange={handleChange('username')} name='username'/>
                <label>Password</label>
                    <input type='text' onChange={handleChange('password')} name='password'/>
                <button type='submit'>Sign Up</button>
                </form>
        </div>
    )
}

export default SignUp