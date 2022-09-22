import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			state.cart.push(action.payload);
		},
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
