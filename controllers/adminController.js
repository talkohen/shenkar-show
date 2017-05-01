var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var departmentController = require ('../controllers/departmentController');
var instituteController = require ('../controllers/instituteController');
var userController = require ('../controllers/userController');
var auth = require ('../controllers/authController');
var async = require("async");


exports.getIndex = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
	res.send (req.cookies.shenkarShowUserId);
}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
};

exports.createInstitute = function (request,response, files) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		
	    		instituteController.createInstitute (request, response, files);
	    	
	
	}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};


exports.updateInstitute = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		 
	    		instituteController.updateInstitute (request, response, files);
	    	
	    
}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};


exports.deleteInstitute = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		
	    		instituteController.deleteInstitute (request, response, files);
	    	
	    
}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};






exports.getInstitutes = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{

    institute.find ({}).exec (function (err, docs) {
    
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
		
		


}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
};


exports.getUsers = function (req, res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		user.find ({  role: "institute manager"}).populate('institute', 'name').
    exec (function (err, Users) {
        console.log ('Users: ' + Users);
        res.send (Users);
        return;
    });

}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
};

exports.createUser = function (request,response) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		  if (request.body.role == "institute manager")
	    		{
	    		userController.createUser (request, response);
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to create a institute manager user."});
	    		}

}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};


exports.updateUser = function (request, response) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		
	    		userController.updateUser (request, response);
	    		

}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};


exports.deleteUser = function (request, response) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'admin')
	{
		  
	    		userController.deleteUser (request, response);
	    		
	    		
}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};
