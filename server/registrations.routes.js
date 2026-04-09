dotenv.config();

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

// DELETE /api/registrations/:id - delete a registration by id
router.delete('/registrations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM registration WHERE id = ?', [id]);
    await connection.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM registration');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

export default router;
