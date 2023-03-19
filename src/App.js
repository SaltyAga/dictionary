import { BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Library from "./Library";
import './App.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import React, { useState, useEffect } from 'react';
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';
import axios from 'axios';

const verifyTokenUrl = process.env.REACT_APP_BASE_URL + '/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
        return;
    }

    const requestConfig = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    }
    const requestBody = {
        user: getUser(),
        token: token
    }

    axios.post(verifyTokenUrl, requestBody, requestConfig).then(response => {
        console.log("response" + response)
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
    }).catch((error) => {
        console.log(error);
        resetUserSession();
        setAuthenticating(false);
    })
  } , [])

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <BrowserRouter>
        <div className="App">
            <div className="header">
                <NavLink activeclassname="active" to="/">Home</NavLink>
                <NavLink activeclassname="active" to="/register">Register</NavLink>
                <NavLink activeclassname="active" to="/login">Login</NavLink>
                <NavLink activeclassname="active" to="/library">Your library</NavLink>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
                    <Route path="/login" element={<PublicRoute><Login />/</PublicRoute>}/>
                    <Route path="/library" element={<PrivateRoute><Library /></PrivateRoute>}/>
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
