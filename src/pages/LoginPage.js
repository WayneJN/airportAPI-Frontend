import React, { useState } from 'react';
import '../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'user' && password === 'user') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'user');
            setUserRole('user');
            navigate('/UserDashboard');
        } else if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin');
            setUserRole('admin');
            navigate('/AdminDashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login__welcome">
                        <i className="fas fa-plane-departure"
                           style={{fontSize: '32px', color: '#D71920', marginBottom: '12px'}}></i>
                        <h1 className="welcome-title">Welcome to Air Canada</h1>
                        <h2 className="welcome-subtext">Your journey starts here</h2>
                    </div>

                    <form className="login" onSubmit={handleLogin}>
                        <div className="login__field">
                            <label htmlFor="username" className="login__label">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="login__input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="login__field">
                            <label htmlFor="password" className="login__label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="login__input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Login</span>
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>

                    <p className="login__footer">✈️ Powered by AirConnect • Fly smarter</p>


                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
                <div className="cloud cloud3"></div>
                <div className="cloud cloud4"></div>

            </div>
        </div>
    );
};

export default LoginPage;
