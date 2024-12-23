import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import '../styles.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        try {
            const response = await login({ email, password });
            if (response.data.message === 'Login successful') {
                const role = response.data.role;
                navigate(role === 'Admin' ? '/admin-dashboard' : '/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again later.');
        }
    };

    return (
        <div className="container">
            <img
                src="https://i.pinimg.com/236x/8f/85/11/8f8511128dfbb1ba195e0451b3dbb612.jpg"
                alt="Login"
                className="login-image"
            />
            <h2 className="centered-heading">MEMBER LOGIN</h2>
            <form onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    
                    <div className="input-wrapper">
                        <i className="fa fa-user input-icon" aria-hidden="true"></i>
                        <input
                            id="email"
                            type="email"
                            placeholder="     Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    
                    <div className="input-wrapper">
                        <i className="fa fa-lock input-icon" aria-hidden="true"></i>
                        <input
                            id="password"
                            type="password"
                            placeholder="     Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-options">
                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button
                        type="button"
                        className="forgot-password-button"
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot Password?
                    </button>
                </div>
                <button type="submit" className="medium-rounded-button">
                    LOGIN
                </button>
                </form>
            
        </div>
    );
}

export default Login;
