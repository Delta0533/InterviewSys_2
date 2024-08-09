import React, { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [users, setUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    // if (localStorage.getItem('seniorId')) {
    //     window.location.href = '/table';
    // }

    useEffect(() => {
        fetch('http://10.20.23.32:6970/seniors')
            .then(response => response.json())
            .then(data => {
                setUsers(data['items']);
                setUsernames(data['items'].map(user => user.name));
            })
            .catch(error => console.error('Error fetching usernames:', error));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username) {
            console.error('Username is empty');
            alert('Please select a username to login');
            return;
        }

        const user = users.find(user => user.name === username);
        if (user) {
            setCookie('userName', user.name, { path: '/' })
            setCookie('userID', user.id, { path: '/' })
            const userId = user.id;
            localStorage.removeItem('seniorId');
            localStorage.setItem('seniorId', userId);
            localStorage.setItem('seniorName', username);
            window.location.href = '/table';
        } else {
            console.error('User not found');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <select
                        className="select select-info w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        <option selected>Select Your Username</option>
                        {usernames.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;