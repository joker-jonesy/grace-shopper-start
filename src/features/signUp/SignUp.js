import React, {useState} from 'react'
import axios from 'axios'

function SignUp (){
    const [signUp,setSignUp]=useState({isAdmin:false})
    const [password1, setPassword1]= useState('')
    const [password2, setPassword2]=useState('')
    const [message, setMessage]=useState('')
    
    const createNewUser = async (newUser)=>{
        try{
        let {data} = await axios.post('/api/signUp', newUser)
        return data
        }
        catch(error){console.log(error)
            setMessage(error.response.data+': Username/Email already in use')}
    }
    const handleChange = props => event => {
        setSignUp({
            ...signUp,
            [props]:event.target.value
        })
    }
    const handlePassword = props => event=>{
        setPassword1(event.target.value)
        setSignUp({...signUp, [props]:event.target.value})
        return password1
    }
    const handlePassword2 = props=> event=>{
        setPassword2(event.target.value)
        return password2
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        let password = password1
        console.log(password)
        if(password1===password2){
            setMessage('')
        setSignUp({...signUp})
        let newSignUp = await createNewUser(signUp)
        if(newSignUp.id){setMessage('Account Created! Please Click on Profile on the Nav Bar to Login!')}
        }
        else{
                setMessage(<div>Passwords do not match</div>)
            
        }
    }

    return(
        <div className='rest'>
            <h3>Please use the following form to Sign Up</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <label>First Name</label>
                        <input  type='text' onChange={handleChange('fName')} required />
                    <label>Last Name</label>
                        <input type='text' onChange={handleChange('lName')} name='lName' required/>
                    <label>Email</label>
                        <input type='email' onChange={handleChange('email')} name='email' required/>
                    <label>Username</label>
                        <input type='text' onChange={handleChange('username')} name='username' required minLength={5} maxLength={32}/>
                    <label>Password</label>
                        <input type='password' onChange={handlePassword('password')} name='password' required minLength={4} maxLength={20}/>
                    <label>Retype Password</label>
                        <input type='password' onChange={handlePassword2('password2')} name='password' required minLength={4} maxLength={20}/>
                    <button className='login-button' type='submit'>Sign Up</button>
                    </form>
                {message}
        </div>
    )
}

export default SignUp