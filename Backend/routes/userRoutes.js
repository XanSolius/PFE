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

// 🔹 Get All Users Route
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users ❌' });
  }
});

// 🔹 Get User by ID Route
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found ❌' });
    }

    res.status(200).json(result.rows[0]); // Return the user's details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error ❌', error: error.message });
  }
});

// 🔹 Update User Route
router.put('/update-user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, role, department, password } = req.body;

  try {
    // Fetch the current user's details
    const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found ❌' });
    }

    const currentUser = userResult.rows[0];

    // Prevent updating the role of an admin user
    if (currentUser.role === 'admin' && role && role !== 'admin') {
      return res.status(403).json({ message: 'Cannot update the role of an admin user ❌' });
    }

    let query;
    let values;

    if (password) {
      // Hash the new password if provided
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      query = `
        UPDATE users 
        SET username = $1, email = $2, role = $3, department = $4, password = $5 
        WHERE user_id = $6 
        RETURNING *
      `;
      values = [username, email, role, department, hashedPassword, userId];
    } else {
      // If no password is provided, don't update the password
      query = `
        UPDATE users 
        SET username = $1, email = $2, role = $3, department = $4 
        WHERE user_id = $5 
        RETURNING *
      `;
      values = [username, email, role, department, userId];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found ❌' });
    }
    res.status(200).json({ message: 'User updated successfully ✅', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error ❌', error: error.message });
  }
});

// 🔹 Delete User Route
router.delete('/delete-user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the current user's details
    const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found ❌' });
    }

    const currentUser = userResult.rows[0];

    // Prevent deleting an admin user
    if (currentUser.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete an admin user ❌' });
    }

    // Delete the user
    await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);

    res.status(200).json({ message: 'User deleted successfully ✅' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error ❌', error: error.message });
  }
});

module.exports = router;