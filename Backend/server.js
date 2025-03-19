// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Import pool from db.js
const userRoutes = require('./routes/userRoutes'); // Import userRoutes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// SECRET for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'TFxansolius333@%';

// Routes
app.use('/api/users', userRoutes); // Use userRoutes for user-related endpoints

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

        res.json({ message: 'Login successful ✅', token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error ❌' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});