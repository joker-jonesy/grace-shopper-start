import axios from 'axios'
import React, {useState} from 'react'

function UpdatePassword (props){
    const [changePassword, setChangePassword] = useState({id:props.user.id,username:props.user.username})
    const [password, setPassword] = useState('')
    const [password2, setPassword2]= useState('')
    const [message, setMessage] = useState('')

    const updatePassword = async (newPasswordObj)=>{
        try{ 
        const newPassword = await axios.put(`/api/auth/${newPasswordObj.id}/changePassword`, newPasswordObj)
        return newPassword

        }catch(error){console.log(error)}
    }

    const handleChange = props => event =>{
        setChangePassword({
            ...changePassword,
            [props]:event.target.value
        })
    }

    const handlePassword = props => event=> {
        setPassword(event.target.value)
        setChangePassword({
            ...changePassword,
            [props]:event.target.value
        })
    }

    const handlePassword2 = props=> event =>{
        setPassword2(event.target.value)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(password===password2){
            setMessage('')
            let updatedPassword = await updatePassword(changePassword)
            if(updatedPassword){
            setMessage('Password updated')}
            else{setMessage('Current password incorrect, please try again')}
            return updatedPassword
        }else setMessage('Passwords did not match, please try again')
    }

    return(<div><h3>Update Password</h3>
    <form onSubmit={handleSubmit}>
        <label>Current Password</label>
            <input type='password' onChange={handleChange('currentPassword')} required/>
        <label>New Password</label>
            <input type='password' onChange={handlePassword('password')} required/>
        <label>Retype New Password</label>
            <input type='password' onChange={handlePassword2('password2')} required/>
        <button type='submit'>Change Password</button>
    </form>
    <div>{message}</div>
    </div>)
}

export default UpdatePassword