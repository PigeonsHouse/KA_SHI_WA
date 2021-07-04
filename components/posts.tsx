import style from '../styles/timeline.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";
import PostCard from './post';
import CreatePostCard from './createPost';

const baseUrl = process.env.backendBaseUrl;

const Posts = () => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const fetchThread = () => {
		axios.get(baseUrl + 'threads/' + state.selectedThreadID + '/posts?limit=100')
		.then((res) => {
			console.log(res.data);
			setStorePosts(res.data);
		})
		.catch((err) => {
			console.log(err.response);
			if(err.response.status === 404){
				setStorePosts([
					{
						id: 0,
						content: "投稿が存在しません。",
						author: {
							name: ''
						}
					}
				]);
			}
		})
	}
	const setStorePosts = (dataList: Array<Object>) => {
		dispatch(timelineSlice.actions.setPosts(dataList));
	}
	useEffect(() => {
		console.log(state.selectedThreadID)
		fetchThread();
	}, [state.selectedThreadID]);

	return(
		<div className={style.post_wrapper}>
			{state.jwt ? (
				<CreatePostCard />
			): null
			}
			{state.postObjectArray.map((threadInfo) => {
				return <PostCard threadInfo={threadInfo} />
			})}
		</div>
	)	
}

export default Posts;