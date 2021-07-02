import { useEffect } from 'react';
import style from '../styles/timeline.module.css';

const ThreadCard = (props) => {
	const threadInfo = props.threadInfo;
	const selectedThread = props.selectedThread;
	let isSelected = (selectedThread === threadInfo.key)

	return(
		<div className={style.thread_card + ' ' + (isSelected ? style.thread_card_selected : null)} key={threadInfo.key} id={threadInfo.key} onClick={props.onClick}>
			<h3 className={style.thread_card_title}>{threadInfo.name}</h3>
			<p className={style.thread_card_author}>{threadInfo.author.name}</p>
		</div>
	)	
}

export default ThreadCard;