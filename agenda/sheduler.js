var Agenda = require('agenda');
var twitter = require('twitter');
var mongoose = require('mongoose');
var models = require('../models/models')
var agenda = new Agenda({db:{address:'127.0.0.1/celebtweets'}});

/*-------------------------------TWITTER CONIG---------------------------------*/
var Twitter = new twitter({
	consumer_key: 'AeyKxX5B5cwjjNkZnsEKHGKQw',
	consumer_secret: 'ItU7lmRdn2B1Y0op33QBMZuC0u754nOhiUPvNw5NjzhmTDaCIN',
	access_token_key: '124144027-lihiLtC1IH8jZzvbuqtC3eWpVc6sc8iJ1IbQk3el',
	access_token_secret: 'SsrRp9x9qqLW6mYwtqhFJEhtaqwhUyge8mE7gp4MUByhd'
});

/*  ------------------------------SCHEMA AND MODEL FOR MONGO----------------------*/

mongoose.connect('mongodb://localhost/celebtweets');

var Tweets = models.Tweets;
var Celebs = models.Celebs

/* ----------------------------------------- JOBS ----------------------------*/

var jobs = function(){
	
		agenda.define('fetch tweets', function(job, done) {

			Celebs.find({},null,null,function(err,data){
				
				data.forEach(function(celeb){
					Twitter.get('statuses/user_timeline', {'screen_name': celeb.screenName, 'trime_user': true, 'since_id':celeb.lastId, 'count':3},function(error, params, tweets){
						var t = JSON.parse(JSON.stringify(params));

						celeb.lastId = t[0].id;
						celeb.save();
						t.forEach(function(tweet){ 
							var newTweet = new Tweets();
							newTweet.screenName = celeb.screenName;
							newTweet.tweet = tweet;
							newTweet.save();
						});
						
					});
				});
				done();
			});
			
			
		});
		//agenda.schedule('in 10 seconds', 'fetch tweets', {time: new Date()});
		agenda.start();
	
}
module.exports = jobs;