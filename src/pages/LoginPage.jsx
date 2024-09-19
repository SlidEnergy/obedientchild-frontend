import React, {useEffect, useState} from 'react';
import './LoginPage.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../core/Auth/AuthContext";

function LoginPage() {
    const navigate = useNavigate();

    const {login, isAuthenticated} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if(isAuthenticated)
            navigate('/');
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
