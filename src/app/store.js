import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';

import logger from 'redux-logger';

const rootReducer = combineReducers({
	login:loginSlice
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
