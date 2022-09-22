import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';
import cartReducer from '../features/cart/cartSlice';
import cardsReducer from '../features/cards/cardsSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({ cards: cardsReducer,login:loginSlice, cart: cartReducer});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
