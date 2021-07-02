import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TimelineState = {
	jwt: string;
	selectedThread: string,
	threadObjectArray: Array<Object>
};

export const initialState: TimelineState = {
	jwt: '',
	selectedThread: '',
	threadObjectArray: []
};

const timelineSlice = createSlice({
	name: 'timeline',
	initialState,
	reducers: {
		setJWT: (state, action: PayloadAction<string>) => ({
			...state,
			jwt: action.payload,
		}),
		setSelectedThread: (state, action: PayloadAction<string>) => ({
			...state,
			selectedThread: action.payload,
		}),
		setThreads: (state, action: PayloadAction<Array<Object>>) => ({
			...state,
			threadObjectArray: action.payload,
		}),
		addThread: (state, action: PayloadAction<Object>) => ({
			...state,
			threadObjectArray: [...state.threadObjectArray, action.payload],
		}),
	}
});

export default timelineSlice;