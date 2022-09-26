import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token')
	? localStorage.getItem('token')
	: null;

const initialState = {
	loggedIn: false,
	user: {},
	status: 'idle',
	error: null,
	token,
};

export const checkToken = createAsyncThunk('user/auth/token', async ()=>{
    const token = localStorage.getItem('token')
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
        return {user,token, loggedIn:true}
    }else user = {}
    localStorage.removeItem('token')
    return {user, token:null, loggedIn:false}
})

export const userLogin = createAsyncThunk('user/auth', async (credentials)=>{
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
            return {user, token}
        }else{
            throw 'login failed bad credentials'
        }
    }catch(e){console.log(e)}
})
export const fetchUser = createAsyncThunk('user/auth/return', async (token)=>{
    try{
    if(token){
        const {data:auth} = await axios.get('/api/auth', {
            headers:{
                authorization:token
            }
        })
        const {id}= auth
        const {data:user} = await axios.get(`/api/auth/${id}/user`,{
            headers:{
                authorization:token
            }
        })
        return user
    }else{throw 'update failed bad credentionals'}}
    catch(error){console.log(error)}
})

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        logout: (state)=>{
            localStorage.removeItem('token')
            state.loading = false
            state.user = {}
            state.token = null
            state.error = null
            state.loggedIn = false
        }
    },
    extraReducers(builder){
        builder
            .addCase(userLogin.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = true
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(userLogin.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error
                state.loggedIn = false
            })
            .addCase(fetchUser.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = true
                state.user = action.payload
                state.token = state.token
            })
            .addCase(fetchUser.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error
                state.loggedIn = false
            })
            .addCase(checkToken.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(checkToken.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = action.payload.loggedIn
                state.token= action.payload.token
                state.user = action.payload.user
            })
            .addCase(checkToken.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error
                
            })
    }
})

export const getUser = (state) => state.user.user;
export const { logout } = loginSlice.actions;
export const getLoggedInStatus = (state) => state.loggedIn.loggedIn;
export default loginSlice.reducer;
