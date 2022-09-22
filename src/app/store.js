import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import cartReducer from '../features/cart/cartSlice';
import cardsReducer from '../features/cards/cardsSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({
	cards: cardsReducer,
	login: loginReducer,
	cart: cartReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
