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

            if (responseData.length > 0) $("#no-articles").remove();

            location.assign('/');
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

        const id = $(this).data('id');
        // console.log(id);

        $.post('/savearticle', {id}, function (responseData) {
            // console.log(responseData);

            $(`#article${id}`).remove();
        });
    });

    // Click on the button 'Delete From Saved"
    $(document).on("click", ".btn-delete-article", function (event) {
        event.preventDefault();
        console.log("btn-save-article clickered");

        const id = $(this).data('id');
        // console.log(id);

        $.post('/deletearticle', {id}, function (responseData) {
            // console.log(responseData);

            $(`#article${id}`).remove();
        });
    });

});