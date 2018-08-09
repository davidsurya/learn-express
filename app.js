const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const response = require('./http/response.js');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

/* check database connect */
db.once('open', function(){
	console.log('connected to mongoDB');
});

/* check database if failed to connect */
db.on('error', function(err){
	console.log(err);
});

let Article = require('./models/article');

/* get all articles */
app.get('/', function (req, res) {
	let articles  = Article.find({}, function(err, articles){
		res.send(articles);
	});
});

/* get article by author */
app.get('/article/author/:author', function (req, res) {
	let articles  = Article.find({'author': req.params.author}, function(err, articles){
		res.send(articles);
	}).sort({body: 1});
});

/* get single article */
app.get('/article/:id', function (req, res) {
	let article  = Article.findById(req.params.id, function(err, articles){
		err ? res.send(response.notFound()) : res.send(articles);
	});
});

/* add article */
app.post('/article/add', function(req, res) {
	let article = new Article();
	article.title  = req.body.title;
	article.author = req.body.author;
	article.body   = req.body.body;

	article.save(function(err) {
		err ? res.send(response.error()) : res.send(response.success());
	});	
});

/* update an article */
app.post('/article/edit/:id', function(req, res) {
	let article = {};
	article.title  = req.body.title;
	article.author = req.body.author;
	article.body   = req.body.body;

	let query = {_id: req.params.id};

	Article.update(query, article, function(err) {
		err ? res.send(response.error()) : res.send(response.success());
	});
});

app.listen(3000, function(){
	console.log('listening on port : 3000');
});