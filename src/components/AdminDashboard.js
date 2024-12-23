import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-section">
                    <h3>All Users</h3>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="dashboard-section">
                    <h3>Admin Profile</h3>
                    <img src="https://via.placeholder.com/150" alt="Admin Profile" className="dashboard-image" />
                    <p>Name: Admin Name</p>
                    <p>Email: admin@example.com</p>
                </section>
                <section className="dashboard-section">
                    <h3>Admin Activities</h3>
                    <ul>
                        <li>Reviewed user reports</li>
                        <li>Updated site settings</li>
                        <li>Managed user accounts</li>
                    </ul>
                </section>
                <section className="dashboard-section">
                    <h3>Site Statistics</h3>
                    <img src="https://via.placeholder.com/300x200" alt="Site Statistics" className="dashboard-image" />
                    <p>Total users: 1500</p>
                    <p>Active users: 1200</p>
                </section>
                <section className="dashboard-section">
                    <h3>Admin Gallery</h3>
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

export default AdminDashboard;
