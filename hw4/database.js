const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "WAD",
  host: "localhost",
  port: "5432",
});

// Users table
pool.query(
  "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT, password TEXT)"
);

// Posts table
pool.query(
  "CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, author INT, content TEXT, likes INT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
);

module.exports = pool;
