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
					{state.jwt ? (
						<div>
							<div className={style.user_card}>
								<div className={style.user_data}>
									<h2>{state.me.name}</h2>
									<p>{state.me.description}</p>
								</div>
								<input type="button" value="SignOut" onClick={SignOut} />
							</div>
						</div>
					): null
					}
					<Threads />
				</div>
			</div>
		</div>
	)
}