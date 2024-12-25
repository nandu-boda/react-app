import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API base URL

// Function to handle login
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Function to handle signup
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData);
        return response;
    } catch (error) {
        console.error('Signup failed:', error);
        throw error;
    }
};

// Function to fetch users (for admin dashboard)
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response;
    } catch (error) {
        console.error('Fetching users failed:', error);
        throw error;
    }
};

// Function to update user role (for admin dashboard)
export const updateUserRole = async (id, newRole) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, { role: newRole });
        return response;
    } catch (error) {
        console.error('Updating user role failed:', error);
        throw error;
    }
};
