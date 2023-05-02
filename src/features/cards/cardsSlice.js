import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cards: [],
	filteredCards: [],
	singleCard: {},
	status: 'idle',
	error: null,
	filter: null,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
	try {
		const { data } = await axios.get('/api/cards');
		await data.sort((a, b) => a.id - b.id);
		console.log("DATA IN THE THUNK: ", data)
		return data;
	} catch (e) {
		console.log(e);
	}
});
export const fetchSingleCard = createAsyncThunk(
	'cards/fetchSingleCard',
	async (id) => {
		try {
			const { data } = await axios.get(`/api/cards/${id}`);
			return data;
		} catch (e) {
			console.log(e);
		}
	}
);
//
const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		changeFilter(state, action) {
			state.filter = action.payload;
			// if (action.payload !== 'All') {
			// 	state.filteredCards = state.cards.filter(
			// 		(card) => card.tag1 === action.payload || card.tag2 === action.payload
			// 	);
			// }
			// state.filteredCards = state.cards;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCards.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.cards = action.payload;
				state.filter = 'All';
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			})
			.addCase(fetchSingleCard.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchSingleCard.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.singleCard = action.payload;
			})
			.addCase(fetchSingleCard.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			});
	},
});

export const getCards = (state) => state.cards.cards;
export const getCardsStatus = (state) => state.cards.status;
export const getFilter = (state) => state.cards.filter;

//export the action variables in reducers object
export const { changeFilter } = cardsSlice.actions;

//export slice reducer to store.js
export default cardsSlice.reducer;
