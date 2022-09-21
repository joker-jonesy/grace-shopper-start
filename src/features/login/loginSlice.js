import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const token = localStorage.getItem('token') 
? localStorage.getItem('token')
:null

const initialState = {
    loggedIn: false,
    user: {},
    status: 'idle',
    error: null,
    token
}

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

export const userLogout = createAsyncThunk()

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
    }
})

export const getUser = (state) => state.user.user
export const {logout} = loginSlice.actions
export const getLoggedInStatus = (state)=> state.loggedIn.loggedIn
export default loginSlice.reducer