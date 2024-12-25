const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1', // Use 127.0.0.1 instead of localhost
    user: 'root',
    password: 'Nandu@9',
    database: 'my_app' // Replace 'my_app' with the actual database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', username, password); // Add this line to log the received data
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        console.log('Query results:', results); // Add this line to log the query results
        if (results.length > 0) {
            res.json({ message: 'Login successful', role: results[0].role });
        } else {
            res.json({ message: 'Invalid credentials' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
    