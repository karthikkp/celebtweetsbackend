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
	var c = {
			'actors' : [],
			'actress' : [],
			'directors' : [],
			'musicDirector' : [],
			'others' : []
		};
	Celebs.find({}, null, null, function(err, celebs){
		
		celebs.forEach(function (celeb){
			if(celeb.category === 'actor'){
				c['actors'].push(celeb);
			}
			else if(celeb.category === 'actress'){
				c['actress'].push(celeb);
			}
			else if(celeb.category === 'director'){
				c['directors'].push(celeb);
			}
			else if(celeb.category === 'musicdirector'){
				c['musicDirector'].push(celeb);
			}
			else if(celeb.category === 'others'){
				c['others'].push(celeb);
			}
		});
		res.jsonp(c);
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

router.get('/:celeb/:id', function (req, res){
	Tweets.findById( req.params.id, function (err, data){
		console.log(data);
		res.jsonp(data);
	});
});
/*-----------------------------------------------------------*/
module.exports = router;
