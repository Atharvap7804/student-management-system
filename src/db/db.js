const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Verify the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.log('❌ Error acquiring client from cloud database pool:', err.stack);
  }
  console.log('✅ Connected to the database successfully over cloud architecture');
  release();
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};