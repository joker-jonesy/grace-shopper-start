import { configureStore, combineReducers } from '@reduxjs/toolkit';

import logger from 'redux-logger';

const rootReducer = combineReducers({});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
