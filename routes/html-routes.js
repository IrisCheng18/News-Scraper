// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
// Has to have 'index.js' placed in the directory /models. 
// Otherwise, the js file specifically contains all the models to be exported needs to be specified
var db = require('../models');

const mongoose = require('mongoose');

module.exports = function (app) {
    // User Handlebars to render the main index.html page
    // And get all the scraped articles from db
    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                // console.log(dbArticle);
                res.render("index", { articles: dbArticle, home: true });
            })
            .catch(function (err) {
                res.render("index", { err: err });
            });

    });

    // A GET route for scraping the New York Times website
    app.get("/scrape", function (req, res) {
        console.log('html-routes: /scrape');

        // First, we grab the body of the html with axios
        axios.get('https://www.nytimes.com/').then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);
            // console.log(response.data);

            let articles = [];

            $("article").each(function (i, element) {
                // Save an empty result object
                let result = {};

                // console.log(`${i}: ${$(this)}`);
                result.headline = $(this).find('h2').text();
                result.summary = $(this).find("p").text() || $(this).find('li').text();
                result.url = $(this).find('a').attr('href');
                result.saved
                if (result.url.includes('https://www.nytimes.com') === false) result.url = 'https://www.nytimes.com' + result.url;
                // console.log(`${i}: headline - ${result.headline}`);
                // console.log(`${i}: summary - ${result.summary}`);
                // console.log(`${i}: url - ${result.url}`);

                // Create a new Article using the 'result' object built from scraping
                if (result.summary !== "") {
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            // console.log(dbArticle);
                            articles.push(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it without interrupt the program
                            console.log(err);
                        });                    
                };
            });

            // Send a message to the client
            // res.render('scrape', { content: 'Scrape complete', articles: articles});
            res.json(true);
        });

    });

    // Route for getting all the saved Articles from the db 
    // After clicking on the link 'Saved Artiles"
    app.get("/saved", function (req, res) {
        db.Article.find({saved: true})
            .then(function (dbArticle) {
                res.render("saved", { articles: dbArticle, home: false });
            })
            .catch(function (err) {
                res.render("saved", { err: err });
            });
    });

    app.get("/clear", function (req, res) {
        mongoose.connection.db.dropDatabase();

        res.json(true);
    });

    app.post("/savearticle", function (req, res) {
        console.log(req.body.id);

        db.Article.findOneAndUpdate({ _id: req.body.id }, { saved: true }, { new: true })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/deletearticle", function (req, res) {
        console.log(req.body.id);

        db.Article.findOneAndUpdate({ _id: req.body.id }, { saved: false }, { new: true })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });

    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });



};