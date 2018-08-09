const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

/* routes files */
let article = require('./routes/articles.js');
app.use('/article', article);

app.listen(3000, function(){
	console.log('listening on port : 3000');
});