import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306
};

const dbName = 'db_LVC';

async function setupDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE ${dbName}`);
    await connection.query(`CREATE TABLE IF NOT EXISTS registration (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      location VARCHAR(100) NOT NULL,
      course VARCHAR(100) NOT NULL
    )`);
    await connection.query(`CREATE TABLE IF NOT EXISTS signup (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);
    console.log('Database and tables setup complete.');
  } catch (err) {
    console.error('Error setting up database:', err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();
