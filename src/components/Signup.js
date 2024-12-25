import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api'; // Ensure this API function is implemented in your backend
import '../styles.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await signup({ username, email, password });
            console.log(response.data);

            if (response.data.message === 'Signup successful') {
                alert('Signup successful! You can now log in.');
                navigate('/');
            } else {
                setError(response.data.error || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <img
                src="path/to/your/image.jpg"
                alt="Logo"
                className="logo"
            /> {/* Replace with the actual image path */}
            <h2 className="centered-heading">CREATE ACCOUNT</h2>
            <form onSubmit={handleSignup}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-container">
                        <i className="fa fa-user icon"></i>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-container">
                        <i className="fa fa-lock icon"></i>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-container">
                        <i className="fa fa-lock icon"></i>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="full-width-rounded-button">
                    SIGN UP
                </button>
            </form>
            <div className="additional-options">
                <button
                    className="full-width-white-button"
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}

export default Signup;
