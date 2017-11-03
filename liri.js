// get input from user and set it as an array while ignoring first 2 index's
var inputArr = process.argv.slice(3);

// switch statement to get what is being run like twitter function
switch (process.argv[2]) {
	case 'my-tweets':
		var Twitter = require('twitter');
		var twitter = new Twitter ({
		  consumer_key: '6cKvbWdZwhEfWaNPsGjqUvEOr',
		  consumer_secret: 'HN2OMSxEto4YnLT0HSlGTuIv1DuZscJzmPauBR4xKO8M1yb2zp',
		  access_token_key: '900160119119331328-hbzm6J3ltXdgWqRuSUbTJ7wfHgTc86w',
		  access_token_secret: 'MjDfHVLfToxFiy33v5tqsvqXXVWVoF6XHsESJ5FAt4kj2',
		});
		 
		var params = {
			
			screen_name: 'dril',
			count: 10
		};

		twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		  	if (!error && response.statusCode === 200) {
		  		for (var i=0; i<tweets.length; i++) {
		    		console.log(tweets[i].text);
		    		console.log("-----------------");
		    	}	
		  	}
		  	else {
		  		console.log("meep");
		  	}
		});
		break;
	


	case 'spotify-this-song':
		var Spotify = require('node-spotify-api');
	 
		var spotify = new Spotify ({
		  	id: '66356ad8405848b6bdc681a2f625e7ad',
 			secret: 'b85d02b246b14d65b1ab441746705aa7'
		});
		spotify.search ({ 
			type: 'track', 
			query: inputArr
		}, function(error, data) {
			if (error) {
		    	return console.log('Error occurred: ' + error);
			}
			else {
				for (var i=0; i<data.tracks.items.length; i++) {
					// artist
					console.log(data.tracks.items[i].artists[0].name)
					// name
					console.log(data.tracks.items[i].name);
					// preview link to song
					console.log(data.tracks.items[i].preview_url);
					// album song is fron 
					console.log(data.tracks.items[i].album.name);

					console.log("----------------------")
				}
			}	
		});
		break;
	



	case 'movie-this':	
		OMDBFunc();
		break;
	


	case 'do-what-it-says':
		saysFunc();
		break;	
}





// // twitter API call
// var twitterFunc = function () {
// 	var Twitter = require('twitter');

// 	var client = new Twitter ({
// 	  consumer_key: '6cKvbWdZwhEfWaNPsGjqUvEOr',
// 	  consumer_secret: 'HN2OMSxEto4YnLT0HSlGTuIv1DuZscJzmPauBR4xKO8M1yb2zp',
// 	  access_token_key: '900160119119331328-hbzm6J3ltXdgWqRuSUbTJ7wfHgTc86w',
// 	  access_token_secret: 'MjDfHVLfToxFiy33v5tqsvqXXVWVoF6XHsESJ5FAt4kj2',
// 	});

	 
// 	var params = {
// 		screen_name: 'rockcock64'};
// 		q: 'rockcock64',
// 		count: 10
// 	};

// 	Twitter.search('statuses/user_timeline', params, function(error, tweets, response) {
// 	  	if (!error && response.statusCode === 200) {
// 	    	console.log(tweets);
// 	  	}
// 	  	else {
// 	  		console.log("meep");
// 	  	}
// 	});
// }

// request("https://api.twitter.com/1.1/search/tweets.json?q=%40rockcock64&src=typd&count=10", function(error, response, body) {
// 	if (!error && response.statusCode === 200) {
//     	console.log(tweets);
//   	}
// })
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error && response.statusCode === 200) {
//     console.log(tweets);
//   }
// });

// twitter api 
// var twitterURL = "https://api.twitter.com/1.1/search/tweets.json?q=%40rockcock64&src=typd&count=10";



// // Spotify API call
// var spotifyFunc = function() {
// 	var Spotify = require('node-spotify-api');
	 
// 		var spotify = new Spotify ({
// 		  	id: '66356ad8405848b6bdc681a2f625e7ad',
//  			secret: 'b85d02b246b14d65b1ab441746705aa7'
// 		});
		 
// 		spotify.search({ 
// 			type: 'track', 
// 			query: inputArr
// 		}, 
// 		function(error, data) {
// 			if (error) {
// 		    	return console.log('Error occurred: ' + error);
// 			}
// 		// artist
// 		console.log(data.tracks.items[0].artists[0].name)
// 		// name
// 		console.log(data.tracks.items[0].name);
// 		// preview link to song
// 		console.log(data.tracks.items[0].preview_url);
// 		// album song is fron 
// 		console.log(data.tracks.items[0].album.name);
// });
// }

// // OMDB API call

// // Grab or assemble the movie name and store it in a variable called "movieName"


// // OMDB
// var OMDBfunc = function() { 
// 	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
// 		var movieName = "";

// 		movieName = inputArr.join("+");
// 	 	// If the request is successful (i.e. if the response status code is 200)
// 	  	if (!error && response.statusCode === 200) {

// 		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
// 		    console.log(JSON.parse(body).Title);
// 		    console.log(JSON.parse(body).Year);
// 		    console.log(JSON.parse(body).imdbRating);
// 		    console.log(JSON.parse(body).Ratings[1].Value);
// 		    console.log(JSON.parse(body).Country);
// 		    console.log(JSON.parse(body).Language);
// 		    console.log(JSON.parse(body).Plot);
// 		    console.log(JSON.parse(body).Actors);
// 		    console.log("This is unrelated but you should def watch trainspotting")
// 	  }
// 	  else {
// 	  	console.log("Mr.nobody");
// 	  }
// 	});
// }	
