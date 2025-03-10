-- Drop the old table if it exists (optional, only if you want a fresh start)
DROP TABLE IF EXISTS users;

-- Create the database if it doesn't exist
CREATE DATABASE pfe_db;

-- Connect to the new database
\c pfe_db;

-- Create the users table with updated constraints
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    department VARCHAR(50)
);
