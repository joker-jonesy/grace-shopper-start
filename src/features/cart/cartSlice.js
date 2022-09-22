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
			const productItems = state.cart.map((item) => item.productId);
			if (productItems.includes(action.payload.productId)) {
				state.cart.map((item) => {
					if (item.productId === action.payload.productId) {
						item.qty += action.payload.qty;
					}
				});
			} else {
				state.cart.push(action.payload);
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
