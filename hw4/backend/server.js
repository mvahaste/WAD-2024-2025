const express = require("express");
const pool = require("./database");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// Return "Hello, World!" for requests to the root URL: localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
