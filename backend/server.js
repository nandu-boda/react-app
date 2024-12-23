const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nandu@9', // Your MySQL password
    database: 'my_app'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Signup route
app.post('/signup', (req, res) => {
    const user = { ...req.body, role: 'User' }; // Default role is 'User'
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Signup failed. Please try again.');
        } else {
            console.log('User added:', result);
            res.send('User added...');
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Login failed. Please try again.');
        } else if (results.length > 0) {
            const user = results[0];
            res.send({ message: 'Login successful', role: user.role });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// Fetch all users route
app.get('/users', (req, res) => {
    const sql = 'SELECT name, email, role FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Failed to fetch users. Please try again.');
        } else {
            res.send(results);
        }
    });
});
