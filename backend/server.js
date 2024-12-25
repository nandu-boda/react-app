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

app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received signup request:', username, email); // Log the received data
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ message: 'Signup successful' });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
