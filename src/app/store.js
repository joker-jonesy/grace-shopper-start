import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';
import cartReducer from '../features/cart/cartSlice';
import cardsReducer from '../features/cards/cardsSlice';
import logger from 'redux-logger';
import ordersSlice from '../features/admin/ordersSlice';
import usersSlice from '../features/admin/usersSlice';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	cards: cardsReducer,
	login: loginSlice,
	orders: ordersSlice,
	users: usersSlice,
	cart: cartReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(logger),
});

export const persistor = persistStore(store);
