import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react"
import Threads from "../components/threads";
import style from "../styles/timeline.module.css";

export default () => {
	const router = useRouter();
	const [jwt, setJWT] = useState(null);
	const SignOut = () => {
		setJWT('exit');		
	}
	useEffect(() => {
		if(jwt === 'exit'){
			localStorage.removeItem('jwt');
			router.push('/')
		}
		let localJWT = localStorage.getItem('jwt');
		if (localJWT !== jwt)
			setJWT(localJWT);
	})
	return (
		<div className={style.timeline}>
			<Threads jwt={jwt} />
			<input type="button" value="SignOut" onClick={SignOut} />
		</div>
	)
}