import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	products: [],
	status: 'idle',
	error: null,
};

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		try {
			const { data } = await axios.get('/api/products');

			return data;
		} catch (e) {
			console.log(e);
		}
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			});
	},
});

export const getCards = (state) => state.cards.cards;
export const getCardsStatus = (state) => state.cards.status;

//export the action variables in reducers object
export const {} = productsSlice.actions;

//export slice reducer to store.js
export default productsSlice.reducer;
