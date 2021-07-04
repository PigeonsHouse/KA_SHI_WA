import axios from 'axios';
import { useState } from 'react';
import style from '../styles/timeline.module.css';
import { useDispatch } from "react-redux";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";

const baseUrl = process.env.backendBaseUrl;

const CreateThreadCard = () => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const [threadName, setThreadName] =useState('');
	const [isCreating, setCreating] = useState(false);
	const startCreateThread = () => {
		if(!isCreating) setCreating(true);
	}
	const handleChange = (event) => {
		if(event.target.name === 'threadName')
			setThreadName(event.target.value);
	};
	const createThread = (e) => {
		e.preventDefault();
		let config = {
			headers: {
				'jwt-token': 'Bearer ' + state.jwt
			}
		}
		let request = {
			"name": threadName
		}
		let meDict = state.me;
		let newThreadData;
		axios.post(baseUrl + 'threads', request, config)
		.then((res) => {
			if(res.status === 200){
				newThreadData = res.data;
				newThreadData.author = meDict;
				console.log(newThreadData, meDict)
				dispatch(timelineSlice.actions.addThread(newThreadData));
				dispatch(timelineSlice.actions.setSelectedThread(newThreadData.name));
				dispatch(timelineSlice.actions.setSelectedThreadID(newThreadData.key));
			}
		})
		.catch((err) => {
			console.error(err);
			return;
		})
		setCreating(false)
	}
	const stopCreateThread = () => {
		setCreating(false);
	}
	return(
		<div className={style.thread_card_create} key='create' onClick={startCreateThread}>
			{
			isCreating ? (
				<>
					<form className={style.thread_card_create_form} onSubmit={createThread}>
						<input className={style.thread_card_create_box} type='text' name='threadName' onChange={handleChange} />
						<div className={style.thread_card_create_buttons}>
							<input className={style.thread_card_create_button} type='button' value='戻る' onClick={stopCreateThread} />
							<input className={style.thread_card_create_button} type='submit' value='作成' />
						</div>
					</form>
				</>
			):<div className={style.thread_card_create_icon}>+</div>
			}
		</div>
	)
}

export default CreateThreadCard;