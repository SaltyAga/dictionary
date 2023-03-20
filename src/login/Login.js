import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../service/AuthService';

const loginUrl =  process.env.REACT_APP_BASE_URL + '/login';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);

	const navigate = useNavigate();

	const submitHandler = (event) => {
		event.preventDefault();
		if (email.trim() === '' || password.trim() === '') {
			setMessage('Both user name and password are required');
			return;
		}
		setMessage(null);
		const requestConfig = {
			headers: {
				'x-api-key': process.env.REACT_APP_API_KEY
			}
		}
		const requestBody = {
			userId: email.toLowerCase().trim(),
			userEmail: email.toLowerCase().trim(),
			password: password
		}
		axios.post(loginUrl, requestBody, requestConfig).then(response => {
			setUserSession(response.data.user, response.data.token);
			navigate('/library');
		}).catch(error => {
			if (error.response.status === 401 || error.response.status === 403) {
				setMessage(error.response.data.message);
			} else {
				console.log(error.response.data.message);
				setMessage('Sorry, there is a server error, please try again later');
			}
		});
	}
	return (
		<div>
			<form onSubmit = {submitHandler}>
				<h5>Login</h5>
				email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
				password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
				<input type="submit" value="Login"/>
			</form>
			{message && <p className="message">{message}</p>}
		</div>
	);
}

export default Login;