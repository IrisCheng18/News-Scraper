// server.js - This file is the initial starting point for the Node/Express server

const express = require('express');

// Sets up the Express App
const app = express();

// Set the port of our application
const PORT = 8080;

// Sets up the Express app to handle data parsing as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static directory
app.use(express.static('public'))

// Set Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
require("./routes/html-routes")(app);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost: ${PORT}`);
});