var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var departmentController = require ('../controllers/departmentController');
var userController = require ('../controllers/userController');
var auth = require ('../controllers/authController');
var async = require("async");


exports.getIndex = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		
		 res.writeHead(302, {Location: 'http://talco.co/shenkar-show/institute'});
	 		res.end ();
	 		
	}
else {
res.writeHead(302, {Location: 'http://talco.co/shenkar-show/login'});
	 		res.end ();
	 		
}
	}); }
	else {
		res.writeHead(302, {Location: 'http://talco.co/shenkar-show/login'});
	 		res.end ();
	 		
	}
};

exports.createDepartment = function (request,response, files) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		departmentController.createDepartment (request, response, files);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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


exports.updateDepartment = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		departmentController.updateDepartment (request, response, files);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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


exports.deleteDepartment = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		departmentController.deleteDepartment (request, response, files);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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






exports.getDepartments = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
    		
    		user.findOne ({_id : managerId}).exec (function (err , manager) {

    department.find ({ institute : manager.institute}).exec (function (err, docs) {
    
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
		
		
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
	if (result == 'institute manager')
	{
		var myUsers = [];
		var managerId =  req.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);
		
		user.findOne ({_id : managerId}).exec (function (err, manager){
		
	    institute.findOne ({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	console.log ("INSTITUTE : " + doc);
	    	
	    	user.find ({ institute : doc._id, role: "department manager"}).populate('institute', 'name').
    exec (function (err, instituteUsers) {
        console.log ('institute Users: ' + instituteUsers);
        res.send (instituteUsers);
        return;
    });
    
    });
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
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		
	    		if (request.body.role == "department manager")
	    		{
	    		userController.createUser (request, response);
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to create a department manager user."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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


exports.updateUser = function (request, response) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	
	    	
	    	if (request.body.institute ==  doc._id ){
	    		
	    		if (doc.role == "department manager") {
	    		userController.updateUser (request, response);
	    		}
	    		
	    		else {
	    			response.json ({error: "You are only authorized to update department managers."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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


exports.deleteUser = function (request, response) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		
	    		if (doc.role == "department manager") {
	    		userController.deleteUser (request, response);
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to delete department managers."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this institute."});
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