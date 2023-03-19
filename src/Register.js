import React, {useState} from 'react';
//import { REACT_APP_BASE_URL, REACT_APP_API_KEY } from '../local.env';
import axios from 'axios';

const registerUrl = process.env.REACT_APP_BASE_URL + '/register';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);

	const submitHandler = (event) => {
		event.preventDefault();
		if (name.trim === '' || email.trim() === '' || password.trim() === '') {
			setMessage('All fields are required');
			return;
		}
		setMessage(null);
		const requestConfig = {
			headers: {
				'x-api-key': process.env.REACT_APP_API_KEY
			}
		}
		const requestBody = {
			name: name,
			userId: email,
			userEmail: email,
			password: password
		}
		axios.post(registerUrl, requestBody, requestConfig).then(response => {
			setMessage('Registration Successful');
		}).catch(error => {
			if (error.response.status === 401) {
				setMessage(error.response.data.message);
				return;
			} else {
				console.log(error.response.data.message);
				setMessage('Sorry, there is a server error, please try again later: ');
				return;
			}
		});
	}

	return (
		<div>
			<form onSubmit = {submitHandler}>
				<h5>Register</h5>
				name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
				email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
				password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
				<input type="submit" value="Register"/>
			</form>
			{message && <p className="message">{message}</p>}
		</div>
	)
}

export default Register;