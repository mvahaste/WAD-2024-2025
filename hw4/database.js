const Pool = require("pg").Pool

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "WAD",
  host: "localhost",
  port: "5432",
})

;(async () => {
  // Users table
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`,
  )

  // Posts table
  await pool.query(
    `CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY, 
      author INT NOT NULL, 
      content TEXT NOT NULL, 
      likes INT DEFAULT 0, 
      created TIMESTAMP DEFAULT NOW(), 
      FOREIGN KEY (author) REFERENCES users(id)
    )`,
  )
})()

module.exports = pool
