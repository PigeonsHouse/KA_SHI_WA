import style from '../styles/timeline.module.css';
import { useDispatch } from "react-redux";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";

const ThreadCard = (props) => {
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const threadInfo = props.threadInfo;
	let isSelected = (state.selectedThreadID === threadInfo.key)
	const selectThread = (e) => {
		dispatch(timelineSlice.actions.setSelectedThread(threadInfo.name));
		dispatch(timelineSlice.actions.setSelectedThreadID(threadInfo.key));
	}

	return(
		<div className={style.thread_card + ' ' + (isSelected ? style.thread_card_selected : null)} key={threadInfo.key} id={threadInfo.key} onClick={selectThread}>
			<h3 className={style.thread_card_title}>{threadInfo.name}</h3>
			<p className={style.thread_card_author}>{'made by '+threadInfo.author.name}</p>
		</div>
	)	
}

export default ThreadCard;