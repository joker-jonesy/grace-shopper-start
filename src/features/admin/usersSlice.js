import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	users: [],
	status: 'idle',
	error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (token)=>{
    if(token){
        const {data} = await axios.get('/api/users',{
            headers:{
                authorization:token
            }
        })
        return data

    }else{throw 'bad credentials'}
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			})
	},
});

export default usersSlice.reducer
