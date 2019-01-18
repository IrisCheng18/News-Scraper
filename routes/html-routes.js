module.exports = function (app) {
    // User Handlebars to render the main index.html page
    app.get("/", function (req, res) {
        res.render('index');
    });
};