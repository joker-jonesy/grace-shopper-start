import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cards: [],
	status: 'idle',
	error: null,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
	try {
		// double check GET route //
		const { data } = await axios.get('/api/cards');
		return data;
	} catch (e) {
		console.log(e);
	}
});

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchCards.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.cards = action.payload;
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			});
	},
});
