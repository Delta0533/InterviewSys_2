import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState([]);

    // useEffect(() => {
    //     
    //     fetch('https://api.example.com/usernames')
    //         .then(response => response.json())
    //         .then(data => setUsernames(data))
    //         .catch(error => console.error('Error fetching usernames:', error));
    // }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Username:', username);
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
                        <option disabled selected>Select Your Username</option>
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