import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserObject extends Object {
	key?: string,
	name?: string,
	email?: string,
	description?: string,
	created_at?: number,
	updated_at?: number
}

interface PostObject extends Object {
  key?: string,
  author_key?: string,
  author?: UserObject,
  thread_key?: string,
  content?: string,
  created_at?: number,
  updated_at?: number
}

interface ThreadObject extends Object {
	key?: string,
	name?: string,
	author_key?: string,
	author?: UserObject,
	created_at?: number,
	updated_at?: number
}

export type TimelineState = {
	jwt: string;
	selectedThread: string,
	selectedThreadID: string,
	threadObjectArray: Array<Object>,
	postObjectArray: Array<PostObject>,
	me: UserObject
};

export const initialState: TimelineState = {
	jwt: '',
	selectedThread: '',
	selectedThreadID: '',
	threadObjectArray: [],
	postObjectArray: [],
	me: {}
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
		setSelectedThreadID: (state, action: PayloadAction<string>) => ({
			...state,
			selectedThreadID: action.payload,
		}),
		setThreads: (state, action: PayloadAction<Array<Object>>) => ({
			...state,
			threadObjectArray: action.payload,
		}),
		addThread: (state, action: PayloadAction<Object>) => ({
			...state,
			threadObjectArray: [action.payload, ...state.threadObjectArray],
		}),
		setPosts: (state, action: PayloadAction<Array<Object>>) => ({
			...state,
			postObjectArray: action.payload,
		}),
		addPost: (state, action: PayloadAction<Object>) => ({
			...state,
			postObjectArray: [action.payload, ...state.postObjectArray],
		}),
		setMe: (state, action: PayloadAction<Object>) => ({
			...state,
			me: action.payload
		})
	}
});

export default timelineSlice;