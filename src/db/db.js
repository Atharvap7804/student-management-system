const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//verify the connection
pool.connect((err,client,release)=>{
  if(err){
   return console.log('Error acquiring client', err.stack)
  }
  console.log('Connected to the database');
  release();
})

module.exports={
  query: (text, params) => pool.query(text, params),
}