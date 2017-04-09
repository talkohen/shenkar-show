var mongoose = require ('../database');
var user = require ('../schemes/user');
var crypto = require ('../crypto');

exports.authCookies =    function (session, userId, callback ) {
	if (userId != undefined) {
		var query = user.findOne().where ('_id', userId);
		
		 query.exec (function (err,doc) {
	 		try {	
	 	if (crypto.hashCheck (doc.email , session)) {
	 		
	 		console.log ("Role : " + doc.role);
	 		callback (doc.role);
	 	}
	 	else {
	 		
	 		res.writeHead(302, {Location: 'http://talco.co/shenkar-show/login.html'});
			callback ("fail");
			res.end ();
	 	}
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 }
	 	
	 });
	}
	
	else{
		res.writeHead(302, {Location: 'http://talco.co/shenkar-show/login.html'});
			callback ("fail");
			res.end ();
	}
};


exports.logout = function (req, res) {
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	res.clearCookie ("shenkarShowSession", {path: req.cookies.shenkarShowSession.path});
	res.clearCookie ("shenkarShowUserId", {path:req.cookies.shenkarShowUserId.path});
	res.send (true);
	}
	res.send (false);
};

exports.getSession = function (req, res) {
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined || req.cookies.shenkarShowUserName != undefined){

	sessionJSON = 
	{
		"session" : req.cookies.shenkarShowSession,
		"userId" : req.cookies.shenkarShowUserId,
		"userName" : req.cookies.shenkarShowUserName
	} ;
	
	
	res.json (sessionJSON);
	}
	res.send (false);
};
