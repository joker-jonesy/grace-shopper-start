import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({ products: productsReducer });

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
