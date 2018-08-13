require("dotenv").config();

//setting variable for keys and requests
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");


//log to check keys are pulled correctly
console.log("got keys loaded");

//load artist's name in this variable when requested by user for spotify
var getBandName = function (artist) {
    return artist.name;
};

//load information from spotify in this variable when requested by user
var getSpotify = function (songName) {
    //if there's an error
    if (songName === undefined) {
        songName = "The Sign";
    }
    //define the spotify search items
    spotify.search(
        {
            type: "track",
            query: songName,
            limit: 1
        },
        //function for spotify search
        function (err, data) {
            if (err) {
                console.log("error :" + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("singer/band: " + songs[i].artists.map(getBandName));
                console.log("song title: " + songs[i].name);
                console.log("preview the song: " + songs[i].preview_url);
                console.log("album title: " + songs[i].album.name);
                console.log(".............................");
            }
        }
    )
}
//load information from twitter in this variable when requested by user
var getTweets = function () {
    //from this twitter handle
    var params = {
        screen_name: "MakeItMine3"
        //screen_name: twitterUsername
    };

    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("---------------------------------------------------");
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);

            }

        }
    })
};
    //function to run movie search
    var getMovie = function (y) {
        var movieName = y;
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        if (movieName === undefined) {
            movieName = "Mr. Nobody";
        }
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                console.log("Title: " + jsonData.Title);
                console.log("Year: " + jsonData.Year);
                console.log("IMDB Rating: " + jsonData.imdbRating);
                console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
                console.log("Produced in: " + jsonData.Country);
                console.log("Language: " + jsonData.Language);
                console.log("Plot: " + jsonData.Plot);
                console.log("Actors/Actresses: " + jsonData.Actors);
            
            }
        })
    };
    //the do what it says function
    var doWhatItSays = function () {
        fs.readFile("random.txt", "utf8", function (error, data) {
            console.log(data);
            var dataArr = data.split(", ");
        })
    };
    //switch/case statement to determine which function will run
    var chooseFunction = function (action, y) {
        switch (action) {
            case "my-tweets": getTweets();
                break;
            case "spotify-this-song": getSpotify(y);
                break;
            case "movie-this": getMovie(y);
                break;
            case "do-what-it-says": doWhatItSays();
                break;
        }
    };

function runLiri(x, y) {
    console.log(x, y);

    chooseFunction(x, y);
}
runLiri(process.argv[2], process.argv[3]);