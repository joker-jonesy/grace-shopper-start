import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loggedIn: false,
    user: {},
    status: 'idle',
    error: null
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
            return user
        }else{
            throw 'login failed bad credentials'
        }
    }catch(e){console.log(e)}
})

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
            .addCase(userLogin.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state,action)=>{
                state.status = 'succeeded'
                state.loggedIn = true
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state,action)=>{
                state.status = 'failed'
                state.error = action.error
                state.loggedIn = false
            })
    }
})

export const getUser = (state) => state.user.user
export const getLoggedInStatus = (state)=> state.loggedIn.loggedIn

// export const {} = userLogin.actions
export default loginSlice.reducer