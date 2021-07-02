import { useRouter } from "next/dist/client/router";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import Threads from "../components/threads";
import style from "../styles/timeline.module.css";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";

export default () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const SignOut = () => {
		setStoreJWT('exit');
	}
	const setStoreJWT = (jwt) => {
		dispatch(timelineSlice.actions.setJWT(jwt));
	}
	useEffect(() => {
		if(state.jwt === 'exit'){
			localStorage.removeItem('jwt');
			router.push('/')
		}
		let localJWT = localStorage.getItem('jwt');
		if (localJWT !== state.jwt)
			setStoreJWT(localJWT);
	})
	return (
		<div className={style.timeline}>
			<Threads />
			<input type="button" value="SignOut" onClick={SignOut} />
		</div>
	)
}