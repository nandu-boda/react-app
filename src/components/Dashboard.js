import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Dashboard() {
    const [user, setUser] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Dashboard</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-section">
                    <h3>Profile</h3>
                    <img src="https://via.placeholder.com/150" alt="Profile" className="dashboard-image" />
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </section>
                <section className="dashboard-section">
                    <h3>Recent Activities</h3>
                    <ul>
                        <li>Logged in</li>
                        <li>Updated profile</li>
                        <li>Posted a comment</li>
                    </ul>
                </section>
                <section className="dashboard-section">
                    <h3>Statistics</h3>
                    <img src="https://via.placeholder.com/300x200" alt="Statistics" className="dashboard-image" />
                    <p>Number of posts: 10</p>
                    <p>Number of comments: 25</p>
                </section>
                <section className="dashboard-section">
                    <h3>Gallery</h3>
                    <div className="gallery">
                        <img src="https://via.placeholder.com/200" alt="Gallery Image 1" />
                        <img src="https://via.placeholder.com/200" alt="Gallery Image 2" />
                        <img src="https://via.placeholder.com/200" alt="Gallery Image 3" />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
