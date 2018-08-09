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

app.listen(3000, function(){
	console.log('listening on port : 3000');
});