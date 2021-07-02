import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import timelineSlice, { initialState as timelineState } from './timeline/slice';

const rootReducer = combineReducers({
	timeline: timelineSlice.reducer,
});

const preloadedState = () => {
	return { timeline: timelineState };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
	const middlewareList = [...getDefaultMiddleware(), logger];

	return configureStore({
		reducer: rootReducer,
		middleware: middlewareList,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState: preloadedState(),
	});
};

export default createStore;