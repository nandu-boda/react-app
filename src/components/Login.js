import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Ensure this API function works correctly
import '../styles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!username.trim() || !password.trim()) {
            alert('Username and password are required.');
            return;
        }

        try {
            const response = await login({ username, password });
            console.log(response.data);

            if (response.data.message === 'Login successful') {
                const role = response.data.role;
                navigate(role === 'Admin' ? '/admin-dashboard' : '/dashboard');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <div className="container">
            <img 
               src="/2.png" 
               alt="Logo" 
               style={{ width: '150px', height: '150px' }} 
            />
                
            <h2
                style={{
                    color: '#4f4f4f', // Slightly softer dark gray
                    fontSize: '1.5rem', // Increased font size for better visibility
                    fontWeight: '600', // Making it bolder
                    textAlign: 'center',
                    margin: '20px 0',
                }}
            >
                MEMBER LOGIN
            </h2>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <div className="input-container">
                        <i className="fa fa-user icon"></i>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-container">
                        <i className="fa fa-lock icon"></i>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group remember-forgot-container">
                    <label className="remember-me">
                        <input type="checkbox" className="large-checkbox" />
                        Remember Me
                    </label>
                    <button
                        type="button"
                        className="forgot-password-button"
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot Password?
                    </button>
                </div>

                <button type="submit" className="full-width-rounded-button">
                    LOGIN
                </button>
            </form>

            <div className="additional-options">
                {/* Any additional options, like signup or social login buttons */}
            </div>
        </div>
    );
}

export default Login;
