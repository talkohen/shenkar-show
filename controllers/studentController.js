var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var departmentController = require ('../controllers/departmentController');
var projectController = require ('../controllers/projectController');
var userController = require ('../controllers/userController');
var auth = require ('../controllers/authController');
var async = require("async");

exports.getIndex = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'student')
	{
		
		  var studentId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + studentId);

user.findOne ({_id: studentId}).exec (function (err, student) {
	
	console.log ("STUDENT : " + student);
	console.log ("STUDENT project id  : " + student.project);
    project.findOne ({ _id : student.project}).exec (function (err, docs) {
   
        console.log ('PROJECT: ' + docs);
        res.json (docs);
        return;
    });
		
	});
	
}
else {
	res.send ("not authorized!");
}
	}); 
	}
	else {
		res.send ("not authorized!");
	}
};


exports.getProject = function (request, response ) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'student')
	{
		
		  var studentId =  request.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + studentId);
    		
    		user.findOne ({_id : studentId}).exec (function (err , student) {

    project.findOne ({ _id : student.project}).populate('location').exec (function (err, doc) {
    
        console.log ('doc: ' + doc);
        response.json (doc);
        return;
    });
		
		
	});
}
else {
	response.send ("not authorized!");
}
	}); }
	else {
		response.send ("not authorized!");
	}
};





exports.updateProject = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'student')
	{
		  var studentId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: studentId}).exec (function (err, student) {
			
			project.findOne({ _id : student.project}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.id);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.id ==  doc._id ){
	    		projectController.updateProject (request, response, files);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this project."});
	      }
    });
			
			
			
		});
	    
}
else {
	response.json ({error: "invalid seesion token."});
}
	}); }
	else {
		response.json ({error: "no session."});
	}
};

