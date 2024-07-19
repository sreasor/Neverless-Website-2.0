const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2/promise');

(async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await pool.query('SELECT 1'); // Test query
    console.log('Database connected successfully!');
    console.log('Test query result:', rows);

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
