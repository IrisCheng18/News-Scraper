// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
// Has to have 'index.js' placed in the directory /models. 
// Otherwise, the js file specifically contains all the models to be exported needs to be specified
var db = require('../models');

module.exports = function (app) {
    // User Handlebars to render the main index.html page
    app.get("/", function (req, res) {
        res.render('index');
    });

    // A GET route for scraping the New York Times website
    app.get("/scrape", function (req, res) {
        console.log('html-routes: /scrape');

        // First, we grab the body of the html with axios
        axios.get('https://www.nytimes.com/').then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            // console.log(response.data);

            // Send a message to the client
            res.render('scrape', { content: 'Scrape complete' });
        });

    });
};