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
var getBandName = function(artist){
    return artist.name;
};

//load information from spotify in this variable when requested by user
var getSpotify = function(songName){
    //if there's an error
    if (songName === undefined){
        songName = "Not a song";
    }
    //define the spotify search items
    spotify.search(
        {
            type: "track",
            query: songName
        },
        //function for spotify search
        function(err, data){
            if(err){
                console.log("error :" + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i=0; i < songs.length; i++){
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
    var getTweets = function(){
        //from this twitter handle
        var params = {
            screen_name: "MakeItMine3"
        };
    }
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if (!error){
            for (var i = 0; i < tweets.length; i++){
                console.log(tweets[i].created_at);
                
            }
        }
    })

    // `my-tweets`

    // `spotify-this-song`

    // `movie-this`

    // `do-what-it-says`
