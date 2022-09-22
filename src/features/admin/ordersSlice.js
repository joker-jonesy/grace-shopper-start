import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	orders: [],
	status: 'idle',
	error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token)=>{
    if(token){
        const {data} = await axios.get('/api/orders',{
            headers:{
                authorization:token
            }
        })
        return data

    }else{throw 'bad credentials'}
})

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchOrders.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.orders = action.payload;
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			})
	},
});

export default ordersSlice.reducer
