import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import style from '../styles/sign.module.css'

const baseUrl = process.env.backendBaseUrl;

export default () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [jwt, setJWT] = useState(null);
	const handleChange = (event) => {
		switch (event.target.name) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			default:
				console.log('key not found');
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const payload = {
			"email": email,
			"password": password
		}
		axios.post(baseUrl + 'auth/signin', payload)
		.then((res) => {
			console.log(res.data.jwt);
			setJWT(res.data.jwt);
			router.push('/timeline');
		})
		.catch((err) => {
			console.error(err);
		})
	}

	useEffect(() => {
		if(jwt)
			localStorage.setItem('kashiwa_jwt', jwt);
	})

	return (
		<div>
			<h1 className={style.title}>Sign in</h1>
			<form onSubmit={handleSubmit} className={style.form}>
				<div className={style.input_form}>
					<input className={style.input_box} placeholder='メールアドレス' name="email" type="text" value={email} onChange={handleChange} required />
				</div>
				<div className={style.input_form}>
					<input className={style.input_box} placeholder='パスワード' name="password" type="password" value={password} onChange={handleChange} required />
				</div>
				<div className={style.link}>
					<Link href='/'>ホーム</Link>
					<Link href='/signup'>アカウント登録はこちら</Link>
				</div>
				<div className={style.input_button}>
					<input type="submit" className={style.submit}></input>
				</div>
			</form>
		</div>
	)
}