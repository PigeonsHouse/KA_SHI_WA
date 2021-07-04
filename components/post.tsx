import axios from "axios";
import { useTimelineState } from "../modules/timeline/selector";
import { useDispatch } from "react-redux";
import style from '../styles/timeline.module.css';
import timelineSlice from "../modules/timeline/slice";

const baseUrl = process.env.backendBaseUrl;

const PostCard = (props) => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const threadInfo = props.threadInfo;
	const twoZeroFill = (num) => {
		const zero = '00';
		return (zero + String(num)).slice(-2);

	}
	const getTimeString = (timedate) => {
		if(timedate){
			let dateData = new Date(Math.floor(threadInfo.created_at * 1000));
			return `${dateData.getFullYear()}/${twoZeroFill(dateData.getMonth()+1)}/${twoZeroFill(dateData.getUTCDate())} ${twoZeroFill(dateData.getHours())}:${twoZeroFill(dateData.getMinutes())}:${twoZeroFill(dateData.getSeconds())}`
		}else{
			return null
		}
	}
	const deletePost = () => {
		console.log(threadInfo.key)
		let config = {
			headers: {
				'jwt-token': 'Bearer ' + state.jwt
			}
		}
		axios.delete(baseUrl + 'posts/' + String(threadInfo.key), config)
		.then((res) => {
			let deletedPostArray = state.postObjectArray.filter((obj) => {return obj.key !== threadInfo.key})
			if(deletedPostArray.length < 1)
			deletedPostArray = [
				{
					key: '0',
					content: "投稿が存在しません。",
					author: {
						name: ''
					}
				}
			];
			dispatch(timelineSlice.actions.setPosts(deletedPostArray));
		})
		.catch((err) => {
			console.log(err.response);
		})
	}

	return(
		<div className={style.post_card} key={threadInfo.key}>
			<div className={style.post_card_header}>
				<h2 className={style.post_card_author}>{threadInfo.author.name}</h2>
				{(threadInfo.author.name === state.me.name) ? (<input className={style.post_card_delete_button} type='button' value='Ｘ' onClick={deletePost} />) : (<></>)}
			</div>
			<h4 className={style.post_card_text}>{threadInfo.content}</h4>
			<div className={style.post_card_time}>
				<p>{ getTimeString(threadInfo.created_at) }</p>
			</div>
		</div>
	)	
}

export default PostCard;