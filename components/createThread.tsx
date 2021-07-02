import axios from 'axios';
import { useEffect, useState } from 'react';
import style from '../styles/timeline.module.css';

const baseUrl = process.env.backendBaseUrl;

const CreateThreadCard = (props) => {
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
				'jwt-token': 'Bearer ' + props.jwt
			}
		}
		let request = {
			"name": threadName
		}
		let meDict;
		axios.get(baseUrl + 'users/me', config)
		.then((res) => {
			meDict = res.data;
		})
		.catch((err) => {
			console.error(err);
			return;
		})
		axios.post(baseUrl + 'threads', request, config)
		.then((res) => {
			if(res.status === 200){
				props.addTemp(meDict, res.data);
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
					<form onSubmit={createThread}>
						<input type='text' name='threadName' onChange={handleChange} />
						<div>
							<input type='button' value='戻る' onClick={stopCreateThread} />
							<input type='submit' value='作成' />
						</div>
					</form>
				</>
			):<div className={style.thread_card_create_icon}>+</div>
			}
		</div>
	)
}

export default CreateThreadCard;