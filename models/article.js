let mongoose = require('mongoose');

/* Article Schema */
let articleShema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('article', articleShema);