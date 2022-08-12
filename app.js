// app.js

const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books.js');

const app = express();
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/books', books);

// Accessing the path module ---- Heroku deployment
// Step 1:
const path = require("path");

if (process.env.NODE_ENV === "production") {

    app.use(express.static("my-app/build"));

    app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));

   });

}
// Step 2:
// ------------------------------------------------

