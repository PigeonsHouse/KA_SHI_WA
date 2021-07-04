import style from '../styles/timeline.module.css';

const PostCard = (props) => {
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

	return(
		<div className={style.post_card} key={threadInfo.key}>
			<h2 className={style.post_card_author}>{threadInfo.author.name}</h2>
			<h4 className={style.post_card_text}>{threadInfo.content}</h4>
			<div className={style.post_card_time}>
				<p>{ getTimeString(threadInfo.created_at) }</p>
			</div>
		</div>
	)	
}

export default PostCard;