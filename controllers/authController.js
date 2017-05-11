var mongoose = require ('../database');
var user = require ('../schemes/user');
var crypto = require ('../crypto');



var auth =    function (session, userId, callback ) {
	
	console.log ("session : " + session);
	console.log ("userId : " + userId);
	
	if (userId != undefined) {
 user.findOne().where ('_id', userId).exec (function (err,doc) {
	 		try {	
	 	
	 		console.log ("doc : " + doc);
	 		console.log ("Role : " + doc.role);
	 		callback (doc.role);

	 	}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 }
	 	
	 });
	}
	
	else{
			callback ("fail");

	}
};

exports.authCookies = auth;

exports.logout = function (req, res) {
	
	console.log ("REQ : " + req);
	if (req.cookies.shenkarShowSession != undefined && req.cookies.shenkarShowUserId != undefined &&  req.cookies.shenkarShowUserName != undefined){
		
		console.log ("IN : " + req.cookies);
	res.clearCookie ("shenkarShowSession", {path: req.cookies.shenkarShowSession.path});
	res.clearCookie ("shenkarShowUserId", {path:req.cookies.shenkarShowUserId.path});
	res.clearCookie ("shenkarShowUserName", {path:req.cookies.shenkarShowUserName.path});
	}
	
	res.writeHead(302, {Location: 'http://talco.co/shenkar-show/login'});
	res.end ();
	
};

exports.getSession = function (req, res) {
	if (req.cookies.shenkarShowSession != undefined && req.cookies.shenkarShowUserId != undefined && req.cookies.shenkarShowUserName != undefined){
		
	
		console.log ("1 : " );
	auth (req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
		
		console.log ("2 : " );
		sessionJSON = 
	{
		"session" : req.cookies.shenkarShowSession,
		"userId" : req.cookies.shenkarShowUserId,
		"userName" : req.cookies.shenkarShowUserName,
		"role" : result
	} ;
	
	
	res.json (sessionJSON);
		
		
		
	});
	
	}
	else {
		console.log ("3 : " );
	res.send (false);
	}
};
