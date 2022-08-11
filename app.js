// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));



// Accessing the path module ---- Heroku deployment
const path = require("path");

// Step 1:
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "./my-app/build")));

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
  });
}
else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  })
}
// Step 2:
// ------------------------------------------------


// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));