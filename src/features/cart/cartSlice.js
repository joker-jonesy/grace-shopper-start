import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const UserCart = createAsyncThunk('user/auth', async (credentials)=>{
    try{
        const response = await axios.post('/api/auth', credentials)
        const token = response.data
        window.localStorage.setItem('token',token)
        if(token){
            const {data:auth} = await axios.get('/api/auth',{
                headers:{
                    authorization:token
                }
            })
            const {id} = auth
            const {data:user} = await axios.get(`/api/auth/${id}/user`, {
                headers:{
                    authorization:token
                }
            })
            return user
        }else{
            throw 'login failed bad credentials'
        }
    }catch(e){console.log(e)}
})