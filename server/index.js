import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import registrationsRouter from './registrations.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, location, course } = req.body;
  if (!name || !email || !location || !course) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO registration (name, email, location, course) VALUES (?, ?, ?, ?)',
      [name, email, location, course]
    );
    await connection.end();
    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO signup (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    await connection.end();
    res.status(201).json({ message: 'Signup successful.' });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Get all signup records
app.get('/api/signups', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM signup');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Signin endpoint for validating user credentials
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT * FROM signup WHERE email = ? AND password = ?',
      [email, password]
    );
    await connection.end();
    if (rows.length > 0) {
      res.json({ success: true, message: 'Login successful.' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', details: error.message });
  }
});

// Register the registrations API route
app.use('/api', registrationsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
