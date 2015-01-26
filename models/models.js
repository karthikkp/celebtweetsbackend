var mongoose = require('mongoose');

var celebSchema = mongoose.Schema({
	name: String,
	screenName: String,
	category: String,
	lastId: Number
});

var tweetsSchema = mongoose.Schema({
	screenName: String,
	tweet: mongoose.Schema.Types.Mixed,
});

var models = {
	Celebs: mongoose.model('celebs', celebSchema),
	Tweets: mongoose.model('tweets', tweetsSchema)
};

module.exports = models;