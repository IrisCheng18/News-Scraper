// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {
    console.log('document ready');

    // Trigger the home route '/' and load the saved articles from the database
    $.get('/', function (responseData) {
        // console.log(responseData);
    });

    // Click on the button 'SCRAPE NEW ARTICLES'
    $('.btn-scrape').on('click', function (event) {
        event.preventDefault();
        console.log('btn-scrape clicked');

        // Trigger the route '/scrape' to happen and get the response after route '/scrape' happens
        $.get('/scrape', function (responseData) {
            // response is html page of route '/scrape'
            console.log(responseData);

            responseData.forEach(element => {
                const divCard = $('<div>').addClass('card mb-4');

                const aCardHeader = $('<a>').addClass('card-header bg-primary text-light');
                aCardHeader.text(element.headline);
                aCardHeader.attr('href', element.url);
                aCardHeader.attr('target', '_blank');
                const aButton = $('<a>').addClass('btn btn-success float-right text-uppercase btn-save-article');
                aButton
                    .attr('href', '/')
                    .attr('data-headline', element.headline)
                    .attr('data-summary', element.summary)
                    .attr('data-url', element.url);
                aButton.text('Save Article');
                aCardHeader.append(aButton);

                const divCardBody = $('<div>').addClass('card-body');
                const p = $('<p>').addClass('card-text');
                p.text(element.summary);
                divCardBody.append(p);

                divCard.append(aCardHeader, divCardBody);
                $(".article-section").append(divCard);
            });

            // Redirect to the html page 'localhost/scrape'
            // location.assign('/scrape');
        });

    });

    // Click on the button 'CLEAR ARTICLES'
    $('.btn-clear').on('click', function (event) {
        event.preventDefault();
        console.log("btn-clear clicked");

        // Trigger the route '/clear' to happen and get the response after route '/clear' happens
        $.get('/clear', function (responseData) {
            location.assign('/');
        });
    });

    // Click on the button 'Save Article"
    $(document).on("click", ".btn-save-article", function (event) {
        event.preventDefault();
        console.log("btn-save-article clickered");

        const headline = $(this).data('headline');
        const summary = $(this).data('summary');
        const url = $(this).data('url');
        const objUpload = {
            headline: headline,
            summary: summary,
            url: url
        };

        $.post('/savearticle', objUpload, function (responseData) {
            console.log(objUpload);
            console.log(responseData);
        });
    });

});