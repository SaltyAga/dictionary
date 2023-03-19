import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from './service/AuthService';

const Library = () => {
	const user = getUser();
	console.log(user);
	const name = user !== undefined && user ? user.name : '';
	const navigate = useNavigate();

	const logoutHandler = () => {
		resetUserSession();
		navigate('/login');
	}

	return (
		<div>
			<div>Hello {name}!</div>
			<input type="button" value="Logout" onClink={logoutHandler} />
		</div>
	)
}

export default Library;