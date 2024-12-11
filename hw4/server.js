const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const app = express();

// We need to include "credentials: true" to allow cookies to be represented
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

// Parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

app.use((req, _, next) => {
  // Log requests for debugging
  console.log(req.method + " " + req.url);

  next();
});

// GET /api/posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");

    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/posts/:id
app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/posts
app.post("/api/posts", async (req, res) => {
  try {
    const post = req.body;

    const newpost = await pool.query(
      "INSERT INTO posts (author, content) values ($1, $2)    RETURNING*",
      [post.author, post.content]
    );

    res.json(newpost);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/posts/:id
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = req.body;

    const updatepost = await pool.query(
      "UPDATE posts SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1",
      [id, post.content]
    );

    res.json(updatepost);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/posts/:id
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletepost = await pool.query("DELETE FROM posts WHERE id = $1", [
      id,
    ]);

    res.json(deletepost);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
