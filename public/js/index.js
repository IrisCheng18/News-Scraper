// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
    console.log('document ready');

    $('.btn-scrape').on('click', function(event) {
        event.preventDefault();
        console.log('btn-scrape clicked');

        // trigger the route '/scrape' to happen and get the response after route '/scrape' happens
        $.get("/scrape", function(responseData) {
            // response is html page of route '/scrape'
            console.log(responseData);


            // Redirect to the html page 'localhost/scrape'
            // location.assign('/scrape');
        });

    });



});