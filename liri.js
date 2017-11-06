// get input from user and set it as an array while ignoring first 2 index's
var inputArr = process.argv.slice(3);
var Twitter = require('twitter');
var dataArr = [];
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// twitter function
var twitterFunc = function() {
	var twitter = new Twitter ({
	  	consumer_key: '6cKvbWdZwhEfWaNPsGjqUvEOr',
	  	consumer_secret: 'HN2OMSxEto4YnLT0HSlGTuIv1DuZscJzmPauBR4xKO8M1yb2zp',
	  	access_token_key: '900160119119331328-hbzm6J3ltXdgWqRuSUbTJ7wfHgTc86w',
	  	access_token_secret: 'MjDfHVLfToxFiy33v5tqsvqXXVWVoF6XHsESJ5FAt4kj2'
	});
	// parameters for twitter to select the dril account and limit to 10 posts 
	var params = {
		screen_name: 'dril',
		count: 10
	};

	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error && response.statusCode === 200) {
	  		for (var i=0; i<tweets.length; i++) {
	    		console.log(tweets[i].text);
	    		console.log("-----------------");
	    		dataArr.push(tweets[i].text);
	    	}	
	  	}
	  	else {
	  		console.log("meep");
	  	}
	  	// append to random.txt
	    appendFunc();
	});
}

// spotify function
var spotifyFunc = function() {
	spotifySong = inputArr;
	// if user doesn't input a song, default to who let the dogs out
	if (spotifySong == '') {
		spotifySong = "Who let the dogs out?";
	}
	var spotify = new Spotify ({
	  	id: '66356ad8405848b6bdc681a2f625e7ad',
		secret: 'b85d02b246b14d65b1ab441746705aa7'
	});
	spotify.search ({ 
		type: 'track', 
		query: spotifySong
	}, function(error, data) {
		if (error) {
	    	return console.log('Error occurred: ' + error);
		}
		else {
			for (var i=0; i<data.tracks.items.length; i++) {
				// artist
				console.log(data.tracks.items[i].artists[0].name);
				// name
				console.log(data.tracks.items[i].name);
				// preview link to song
				console.log(data.tracks.items[i].preview_url);
				// album song is from 
				console.log(data.tracks.items[i].album.name);
				// divider
				console.log("----------------------");
				dataArr.push(
					data.tracks.items[i].artists[0].name, 
					data.tracks.items[i].name,
					data.tracks.items[i].preview_url,
					data.tracks.items[i].album.name
				);
			}
			appendFunc();
		}	
	});
}

// OMDB
var OMDBfunc = function() { 
	var movieName = '';
	movieName = inputArr.join('+');
	// if user doesn't input any movie, default to Trainspotting which is a great film
	if (movieName == '') {
		movieName = 'Trainspotting';
	}
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	  	if (!error && response.statusCode === 200) {
		    console.log(JSON.parse(body).Title);
		    console.log(JSON.parse(body).Year);
		    console.log(JSON.parse(body).imdbRating);
		    console.log(JSON.parse(body).Ratings[1].Value);
		    console.log(JSON.parse(body).Country);
		    console.log(JSON.parse(body).Language);
		    console.log(JSON.parse(body).Plot);
		    console.log(JSON.parse(body).Actors);
		    console.log("This is unrelated but you should def watch Trainspotting");
		    dataArr.push(
		    	JSON.parse(body).Title,
			    JSON.parse(body).Year,
			    JSON.parse(body).imdbRating,
			    JSON.parse(body).Ratings[1].Value,
			    JSON.parse(body).Country,
			    JSON.parse(body).Language,
			    JSON.parse(body).Plot,
			    JSON.parse(body).Actors
			);
	  	}
	  	appendFunc();
	});
}	

// do what it says function
var doWhatItSaysFunc = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
		return console.log(error);
	}
	inputArr = data;
	spotifyFunc();
	})
}

// function to append data to log.txt
var appendFunc = function() {
	fs.appendFile('log.txt', dataArr, 'utf8', function(error) {
		if (error) {
			console.log(error);
		}
	});
}
// switch statement to get what is being run like twitter function
switch (process.argv[2]) {
	case 'my-tweets':
		twitterFunc();
		break;

	case 'spotify-this-song':
		spotifyFunc();
		break;
	
	case 'movie-this':
		OMDBfunc();	
		break;
	
	case 'do-what-it-says':
		doWhatItSaysFunc();
		break;	
}