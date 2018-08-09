function error(){
	return {"status": false, "message": "Something went wrong"};
}

function success(){
	return {"status": true, "message": "Success"};
}

module.exports.error = error;
module.exports.success = success;