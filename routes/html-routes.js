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
        res.render('index', {home: true});
    });

    // A GET route for scraping the New York Times website
    app.get("/scrape", function (req, res) {
        console.log('html-routes: /scrape');

        // First, we grab the body of the html with axios
        axios.get('https://www.nytimes.com/').then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            // console.log(response.data);

            $("article").each(function (i, element) {
                // Save an empty result object
                let result = {};

                // console.log(`${i}: ${$(this)}`);
                result.headline = $(this).find('h2').text();
                result.summary = $(this).find("p").text() || $(this).find('li').text();
                result.url = $(this).find('a').attr('href');
                // console.log(`${i}: headline - ${result.headline}`);
                // console.log(`${i}: summary - ${result.summary}`);
                // console.log(`${i}: url - ${result.url}`);

                // Create a new Article using the 'result' object built from scraping
                if (result.summary !== "") {
                    db.Article
                        .create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it without interrupt the program
                            console.log(err);
                        });
                };
            });

            // Send a message to the client
            res.render('scrape', { content: 'Scrape complete'});

        });

    });

    // Route for getting all Articles from the db
    app.get("/saved", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.render("saved", {articles: dbArticle, home: false});
            })
            .catch(function (err) {
                res.render("saved", {err: err});
            });
    });


    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });

};