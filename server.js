// server.js - This file is the initial starting point for the Node/Express server
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');


// Set the port of our application
const PORT = 8080;

// INitialize Express
const app = express();


// Configure middleware

// User morgan logger for logging requests
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'))


// Set Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = (process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoHeadlines');

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


// Routes
require("./routes/html-routes")(app);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost: ${PORT}`);
});