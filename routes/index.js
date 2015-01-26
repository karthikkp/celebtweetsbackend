var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/models')
var router = express.Router();

/* MONGOOSE SETUP */

//mongoose.connect('mongodb://localhost/celebtweets');
var Tweets = models.Tweets;
var Celebs = models.Celebs


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*------------------------------------ API --------------------------------------*/
router.get('/celebs', function(req, res){
	Celebs.find({},'screenName name', null, function(err, celebs){
		res.jsonp(celebs);
	});
});
router.get('/tweets', function(req, res){
	Tweets.find({},null, null, function(err, tweets){
		res.jsonp(tweets);
	});
});
router.get('/celebs/:celeb/tweets', function(req, res){
	Tweets.find({screenName: req.params.celeb},null, null, function(err, tweets){
		res.jsonp(tweets);
	});
});
/*-----------------------------------------------------------*/
module.exports = router;
