import ThreadCard from './threadCard';
import CreateThreadCard from './createThread';
import style from '../styles/timeline.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";

const baseUrl = process.env.backendBaseUrl;

const Threads = () => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const fetchThread = () => {
		axios.get(baseUrl + 'threads?limit=100')
		.then((res) => {
			setStoreThreads(res.data);
			setStoreSelectedThread(res.data[0].key);
		})
		.catch((err) => {
			console.error(err);
		})
	}
	const setStoreSelectedThread = (thread_id: string) => {
		dispatch(timelineSlice.actions.setSelectedThread(thread_id));
	}
	const setStoreThreads = (dataList: Array<Object>) => {
		dispatch(timelineSlice.actions.setThreads(dataList));
	}
	useEffect(() => {
		fetchThread();
	}, []);

	return(
		<div className={style.thread_wrapper}>
			{state.threadObjectArray.map((threadInfo) => {
				return <ThreadCard threadInfo={threadInfo} />
			})}
			{state.jwt ? (
			<CreateThreadCard />
			): null
			}
		</div>
	)	
}

export default Threads;