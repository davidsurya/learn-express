function error(){
	return {"status": false, "message": "Something went wrong"};
}

function success(){
	return {"status": true, "message": "Success"};
}

function notFound(){
	return {"status": false, "message": "Not found"};
}

module.exports.error = error;
module.exports.success = success;
module.exports.notFound = notFound;