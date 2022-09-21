import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from '../features/cards/cardsSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({ cards: cardsReducer });

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
