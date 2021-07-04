import { useState } from 'react';
import axios from 'axios';
import style from '../styles/sign.module.css'
import { useRouter } from 'next/dist/client/router';

const baseUrl = process.env.backendBaseUrl;

export default () => {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [description, setDescription] = useState('');
	const handleChange = (event) => {
		switch (event.target.name) {
			case 'name':
				setName(event.target.value);
				break;
			case 'email':
				setEmail(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			case 'description':
				setDescription(event.target.value);
				break;
			default:
				console.log('key not found');
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const payload = {
			"name": name,
			"email": email,
			"password": password,
			"description": description
		}
		axios.post(baseUrl + 'auth/signup', payload)
		.then((res) => {
			alert("Success sign up");
			router.push('/');
		})
		.catch((err) => {
			console.error(err);
		})
	}

	return (
		<div>
			<h1 className={style.title}>Sign up</h1>
			<form onSubmit={handleSubmit} className={style.form}>
				<div className={style.input_form}>
					<input className={style.input_box} name="name" type="text" value={name} onChange={handleChange} placeholder='名前' required />
				</div>
				<div className={style.input_form}>
					<input className={style.input_box} name="email" type="text" value={email} onChange={handleChange} placeholder='メールアドレス' required />
				</div>
				<div className={style.input_form}>
					<input className={style.input_box} name="password" type="password" value={password} onChange={handleChange} placeholder='パスワード' required />
				</div>
				<div className={style.input_form}>
					<textarea name="description" className={style.input_description_box} value={description} onChange={handleChange} placeholder='プロフィール'/>
				</div>
				<div className={style.input_button}>
					<input type="submit" className={style.submit} value='登録'></input>
				</div>
			</form>
		</div>
	)
}