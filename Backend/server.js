require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL ✅'))
    .catch(err => console.error('Database connection error ❌', err));

// SECRET for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'TFxansolius333@%';

// 🔹 Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email ❌' });
        }

        const user = result.rows[0];

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password ❌' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful ✅', token , role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error ❌' });
    }
});

// 🔹 Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied ❌' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message:err });
    }
};

// 🔹 Protected Route Example
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your dashboard! ✅', user: req.user });
});


// Start the server (Only 1 time!)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
