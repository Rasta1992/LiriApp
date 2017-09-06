// Packages //
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify({
	id: "e569112aee16439a976d6172be92ed2f",
	secret: "281f8fbc64c54e2aafdcf6891784460a"
});

var fs = require("fs");

var request = require("request");

var Twitter = require("twitter");



// Twitter Function //
var user = new Twitter (keys.twitterKeys);

var twitterPost = function() {
	var params = {screen_name: "ShamarOrr", count:20};

	user.get("statuses/user_timeline", params, (error, tweets, response) => {

		if (!error) {
			for (var i=0; i<tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(" ");
				console.log(tweets[i].text);
			}

		}
	});

}

var getMeSpotify = function(songName) {
	if(songName==undefined) {
		console.log("Error");
	}  
	spotify.search ({
		type: 'track',
		query: songName
	},
	function(err, data) {
		if (err){
			console.log(err);
			return
		}
		var songs = data.tracks.items;

		for (var i=0; i<songs.length; i++) {
			console.log(i);
			console.log("song name" + songs[i].name);
			console.log("Preview song: " + songs[i].preview_url);
			console.log("Album: " + songs[i].album.name);
			console.log("----------------------------")
		}
	})
}







var pickFunction = function(caseData, functionData){

	switch(caseData){
		case "my-tweets": 
		twitterPost();
		break;
		case "spotify-this-song":
		getMeSpotify(functionData);
		break;
		default: 
		console.log("Liri doesn't know that");
	}
}


var runThis = function(arg2, arg3){
	pickFunction(arg2, arg3);
}

runThis(process.argv[2], process.argv[3]);



		



