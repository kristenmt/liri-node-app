require("dotenv").config();

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");

console.log("got keys loaded");



// var tweet = process.argv[2];
// var spot = process.argv[2];
// var movie = process.argv[2];

    // `my-tweets`

    // `spotify-this-song`

    // `movie-this`

    // `do-what-it-says`
