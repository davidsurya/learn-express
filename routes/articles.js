const express = require('express');
const router = express.Router();
const response = require('../http/response.js');

let Article = require('../models/article');

/* get all articles */
router.get('/', function (req, res) {
	let articles  = Article.find({}, function(err, articles){
		res.send(articles);
	});
});

/* get article by author */
router.get('/author/:author', function (req, res) {
	let articles  = Article.find({'author': req.params.author}, function(err, articles){
		res.send(articles);
	}).sort({body: 1});
});

/* get single article */
router.get('/article/:id', function (req, res) {
	let article  = Article.findById(req.params.id, function(err, articles){
		err ? res.send(response.notFound()) : res.send(articles);
	});
});

/* add article */
router.post('/add', function(req, res) {
	let article = new Article();
	article.title  = req.body.title;
	article.author = req.body.author;
	article.body   = req.body.body;

	article.save(function(err) {
		err ? res.send(response.error()) : res.send(response.success());
	});	
});

/* update an article */
router.post('/edit/:id', function(req, res) {
	let article = {};
	article.title  = req.body.title;
	article.author = req.body.author;
	article.body   = req.body.body;

	let query = {_id: req.params.id};

	Article.update(query, article, function(err) {
		err ? res.send(response.error()) : res.send(response.success());
	});
});

/* deleting an article */
router.delete('/delete/:id', function(req, res) {
	let article = {};

	let query = {_id: req.params.id};

	Article.remove(query, function(err) {
		err ? res.send(response.error()) : res.send(response.success());
	});	
});

module.exports = router