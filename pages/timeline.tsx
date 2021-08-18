import { useRouter } from "next/dist/client/router";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import Threads from "../components/threads";
import Posts from "../components/posts";
import style from "../styles/timeline.module.css";
import { useTimelineState } from "../modules/timeline/selector";
import timelineSlice from "../modules/timeline/slice";
import axios from "axios";

const baseUrl = process.env.backendBaseUrl;

const Timeline = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const state = useTimelineState().timeline;
	const SignOut = () => {
		setStoreJWT('exit');
	}
	const SignIn = () => {
		router.push('/signin')
	}
	const setStoreJWT = (jwt) => {
		dispatch(timelineSlice.actions.setJWT(jwt));
	}
	const getMe = (jwt) => {
		let config = {
			headers: {
				'jwt-token': 'Bearer ' + state.jwt
			}
		}
		axios.get(baseUrl + 'users/me', config)
		.then((res) => {
			dispatch(timelineSlice.actions.setMe(res.data))
		})
		.catch((err) => {
			console.error(err);
		})
	}
	useEffect(() => {
		if(state.jwt === 'exit'){
			localStorage.removeItem('kashiwa_jwt');
			router.push('/')
		}
		let localJWT = localStorage.getItem('kashiwa_jwt');
		if (localJWT !== state.jwt)
			setStoreJWT(localJWT);
			getMe(localJWT);
	})
	return (
		<div>
			<div className={style.timeline}>
				<Posts />
				<div>
					<div>
						<div className={style.user_card}>
							<div className={style.user_data}>
								<h2>{state.jwt ? state.me.name : 'Guest'}</h2>
								<p>{state.me.description}</p>
							</div>
							{
								state.jwt?(
									<input type="button" value="Sign Out" onClick={SignOut} />
								):(
									<input type="button" value="Sign In" onClick={SignIn} />
								)
							}
						</div>
					</div>
					<Threads />
				</div>
			</div>
		</div>
	)
}

export default Timeline;