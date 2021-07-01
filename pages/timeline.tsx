import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react"

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
		<>
			タイムラインだよ～
			<input value="サインアウト" type="button" onClick={SignOut}/>
		</>
	)
}