import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from '../service/AuthService';
import './Library.css';
import Dictionaries from './Dictionaries';

const Library = () => {
	const user = getUser();
	const name = user !== undefined && user ? user.name : '';
	const navigate = useNavigate();

	const logoutHandler = () => {
		resetUserSession();
		navigate('/login');
	}

	return (
		<div className="Library">
			<div>Welcome to your library, {name}!</div>
			<h3>My dictionaries</h3>
			<Dictionaries/>
		
			<input type="button" value="Logout" onClick={logoutHandler} />
		</div>
	)
}

export default Library;