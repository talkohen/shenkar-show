var mongoose = require ('../database');
var user = require ('../schemes/user');
var crypto = require ('../crypto');


//Get user id and return user role. if user not found return false.
var auth =    function (userId, callback ) {
	
	if (userId != undefined) {
		user.findOne().where ('_id', userId).exec (function (err,user) {
	 		try {
			if (user) {
				callback(user.role);
			}
			else {
				return (false);
			}
	 		}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 		}
	 	
	 });
	}
	
	else{
			callback (false);
	}
};

exports.authCookies = auth;

//Clear cookies and return to home page
exports.logout = function (req, res) {
	
	console.log ("REQ : " + req);
	if (req.cookies.shenkarShowUserId != undefined){

	res.clearCookie ("shenkarShowUserId", {path:req.cookies.shenkarShowUserId.path});

	}

	res.writeHead(302, {Location: 'shenkar.xyz'});
	res.end ();
	
};

//Check if there is a session in progress.
exports.getSession = function (req, res) {
	if ( req.cookies.shenkarShowUserId != undefined){

	auth (req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {

		sessionJSON = 
	{
		"userId" : req.cookies.shenkarShowUserId,
		"role" : result
	} ;
	
	
	res.json (sessionJSON);
		
	});
	
	}
	else {

	res.send (false);
	}
};
