// define constants at top of file
// note that using all caps is a convention
// for constants in JS.
var SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var API_KEY = 'AIzaSyAHrofdI7wqp3cqiMNxRmpK50iDrtoCfgo';
var YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";


// dom manipulation logic
function displaySearchResults(data) {

    var displayElem = $('.js-results');
    data.items.forEach(function(item) {
        var elem = $('.js-result-template').children().clone();
        var watchUrl = YOUTUBE_WATCH_URL + item.id.videoId;
        var imageUrl = item.snippet.thumbnails.default.url;
        elem.find('a').attr('href', watchUrl);
        elem.find('img').attr('src', imageUrl);
        displayElem.append(elem);
    });

}

function clearResults() {
    $('.js-results').empty();
}

// ajax logic
function queryYouTube(searchTerm, callbackFn) {
    var data = {
        part: 'snippet',
        key: API_KEY,
        q: searchTerm,
    }
    $.getJSON(SEARCH_URL, data, callbackFn);
}


// event listening logic
function watchForSubmission() {
    $('#js-search-term').submit(function(event){
        event.preventDefault();
        // clear out any existing results in case previous search
        clearResults();
        var searchTerm = $(event.currentTarget).find('input[name="query"]').val().trim();
        queryYouTube(searchTerm, displaySearchResults);
    });
}

$(function() {
    watchForSubmission();
});