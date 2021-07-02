import ThreadCard from './threadCard';
import CreateThreadCard from './createThread';
import style from '../styles/timeline.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = process.env.backendBaseUrl;

const Threads = (props) => {
	const [threads, setThreads] = useState([]);
	const [selectedThread, setSelectedThread] = useState('');
	const fetchThread = () => {
		axios.get(baseUrl + 'threads')
		.then((res) => {
			setThreads(res.data);
			setSelectedThread(res.data[0].key);
		})
		.catch((err) => {
			console.error(err);
		})
	}
	const selectThread = (e) => {
		setSelectedThread(e.currentTarget.id)
		
	}
	const addTempThreadCard = (me, data) => {
		data.author = me;
		setThreads([...threads, data]);
		setSelectedThread(data.key);
	}
	useEffect(() => {
		fetchThread();
	}, []);

	return(
		<div className={style.thread_wrapper}>
			{threads.map((threadInfo) => {
				return <ThreadCard threadInfo={threadInfo} selectedThread={selectedThread} onClick={selectThread}/>
			})}
			{props.jwt ? (
			<CreateThreadCard jwt={props.jwt} addTemp={addTempThreadCard}/>
			): null
			}
		</div>
	)	
}

export default Threads;