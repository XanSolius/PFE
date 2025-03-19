// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import pool from db.js
const bcrypt = require('bcrypt');

// 🔹 Add User Route
router.post('/add-user', async (req, res) => {
    const { userId, name, password, role, email, department } = req.body;

    try {
        // Validate input (optional, can be done on the frontend)
        if (!userId || !name || !password || !role || !email || !department) {
            return res.status(400).json({ message: 'All fields are required ❌' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into the database
        const result = await pool.query(
            'INSERT INTO users (user_id, username, password, role, email, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [userId, name, hashedPassword, role, email, department]
        );

        res.status(201).json({ message: 'User added successfully ✅', user: result.rows[0] });
    } catch (error) {
        console.error('Error adding user:', error); // Log the full error
        res.status(500).json({ message: 'Server error ❌', error: error.message }); // Include error message in response
    }
});

module.exports = router;