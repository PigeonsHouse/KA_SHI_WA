import axios from 'axios';
import { useState } from 'react';
import style from '../styles/timeline.module.css';
import { useDispatch } from "react-redux";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";

const baseUrl = process.env.backendBaseUrl;

const CreatePostCard = () => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const [postContent, setPostContent] =useState('');
	const [isCreating, setCreating] = useState(false);
	const startCreateThread = () => {
		if(!isCreating) setCreating(true);
	}
	const handleChange = (event) => {
		if(event.target.name === 'postContent')
			setPostContent(event.target.value);
	};
	const createThread = (e) => {
		e.preventDefault();
		let config = {
			headers: {
				'jwt-token': 'Bearer ' + state.jwt
			}
		}
		let request = {
			"thread_key": state.selectedThreadID,
			"content": postContent
		}
		let meDict = state.me;
		let newThreadData;
		axios.post(baseUrl + 'posts', request, config)
		.then((res) => {
			if(res.status === 200){
				newThreadData = res.data;
				newThreadData.author = meDict;
				if(state.postObjectArray[0].created_at === undefined){
					dispatch(timelineSlice.actions.setPosts([newThreadData]));
				}else{
					dispatch(timelineSlice.actions.addPost(newThreadData));
				}
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
		<div className={style.post_card_create} key='create' onClick={startCreateThread}>
			{
			isCreating ? (
				<>
					<form className={style.post_card_create_form} onSubmit={createThread}>
						<textarea className={style.post_card_create_box} name='postContent' onChange={handleChange} rows={6} required></textarea>
						<div className={style.post_card_create_buttons}>
							<input className={style.post_card_create_button} type='button' value='戻る' onClick={stopCreateThread} />
							<input className={style.post_card_create_button} type='submit' value='作成' />
						</div>
					</form>
				</>
			):<div className={style.post_card_create_icon}>+</div>
			}
		</div>
	)
}

export default CreatePostCard;