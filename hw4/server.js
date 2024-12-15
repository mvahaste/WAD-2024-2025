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

app.listen(port, () => {
	console.log("Server is listening to port " + port);
});

const secret = "very-secure-secret";
const maxAge = 60 * 60;

const generateJWT = (id) => {
	return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

const authenticateJWT = (req, res, next) => {
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({ error: "Authentication required" });
	}

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: "Invalid token" });
		}

		req.userId = decoded.id;
		next();
	});
};

// GET /api/auth
// Get whether the user is authenticated or not.
app.get("/api/auth", async (req, res) => {
	const token = req.cookies.jwt;
	let authenticated = false;

	try {
		if (token) {
			jwt.verify(token, secret, (err) => {
				if (err) {
					console.log("INVALID TOKEN: " + err.message);

					res.send({ authenticated: authenticated });
				} else {
					console.log("VALID TOKEN!");

					authenticated = true;

					res.send({ authenticated: authenticated });
				}
			});
		} else {
			console.log("NO TOKEN!");

			res.send({ authenticated: authenticated }); // authenticated = false
		}
	} catch (err) {
		console.error(err.message);

		res.status(400).send(err.message);
	}
});

// POST /api/auth/signup
// Sign up a new user.
app.post("/api/auth/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		// If the user already exists, don't allow sign up
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (user.rows.length > 0) {
			console.log("User with this email already exists.");

			return res
				.status(409) // Conflict
				.json({ error: "User with this email already exists." });
		}

		const salt = await bcrypt.genSalt();

		const bcryptPassword = await bcrypt.hash(password, salt);

		const authUser = await pool.query(
			// Save the user to the databse with the email and hashed password
			"INSERT INTO users(email, password) values ($1, $2) RETURNING *",
			[email, bcryptPassword],
		);

		console.log(authUser.rows[0].id);

		const token = generateJWT(authUser.rows[0].id);

		res
			.status(201)
			.cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
			.json({ user_id: authUser.rows[0].id }).send;
	} catch (err) {
		console.error(err.message);

		res.status(400).send(err.message);
	}
});

// POST /api/auth/login
// Log in an existing user.
app.post("/api/auth/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (user.rows.length === 0)
			return res.status(401).json({ error: "User is not registered" });

		/* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].password,
		);

		if (!validPassword)
			return res.status(401).json({ error: "Incorrect password" });

		const token = generateJWT(user.rows[0].id);

		res
			.status(201)
			.cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
			.json({ user_id: user.rows[0].id }).send;
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

// GET /api/auth/logout
// Log out the user.
app.get("/api/auth/logout", (_req, res) => {
	res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" }).send;
});

// GET /api/posts
// Get all posts.
app.get("/api/posts", authenticateJWT, async (_req, res) => {
	try {
		// Get all posts with the author's email by joining the posts and users tables with the author's ID
		const posts = await pool.query(
			"SELECT posts.id, posts.content, posts.likes, posts.created, users.email AS author FROM posts JOIN users ON posts.author = users.id ORDER BY posts.created DESC",
		);

		res.json(posts.rows);
	} catch (err) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
});

// GET /api/posts/:id
// Get a post by it's ID
app.get("/api/posts/:id", authenticateJWT, async (req, res) => {
	try {
		const { id } = req.params;

		const posts = await pool.query(
			"SELECT posts.id, posts.author, posts.content, posts.created FROM posts WHERE id = $1",
			[id],
		);

		posts.rows[0].isAuthor = posts.rows[0].author == req.userId;

		res.json(posts.rows[0]);
	} catch (err) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
});

// POST /api/posts
// Create a new post.
app.post("/api/posts", authenticateJWT, async (req, res) => {
	try {
		const post = req.body;

		// Get the user ID from the JWT
		const token = req.cookies.jwt;
		const decoded = jwt.verify(token, secret);
		const uuid = decoded.id;

		const newpost = await pool.query(
			"INSERT INTO posts (author, content) values ($1, $2)    RETURNING*",
			[uuid, post.content],
		);

		res.json(newpost);
	} catch (err) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
});

// PUT /api/posts/:id
// Update a post by it's ID
app.put("/api/posts/:id", authenticateJWT, async (req, res) => {
	try {
		const { id } = req.params;

		const { content } = req.body;

		const updatepost = await pool.query(
			"UPDATE posts SET content = $2 WHERE id = $1",
			[id, content],
		);

		res.json(updatepost);
	} catch (err) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
});

// DELETE /api/posts/:id
// Delete a post by its ID
app.delete("/api/posts/:id", authenticateJWT, async (req, res) => {
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

// DELETE /nuke
// Delete all posts.
app.delete("/nuke", authenticateJWT, async (req, res) => {
	try {
		const deleteAllPosts = await pool.query("DELETE FROM posts");

		res.json(deleteAllPosts);
	} catch (err) {
		console.error(err.message);

		res.status(500).json({ message: "Internal server error" });
	}
});
