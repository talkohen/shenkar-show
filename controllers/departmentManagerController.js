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
	if (result == 'department manager')
	{
		
		  var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);

    department.find ({ manager : managerId}).populate('manager', 'name').
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
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


exports.createProject = function (request,response, files) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.institute}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		projectController.createProject (request, response, files);
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
			
			institute.findOne({ _id : manager.institute}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
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
			
			institute.findOne({ _id : manager.institute}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
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




exports.getProjects = function (requset,response) {
	
	if (requset.cookies.shenkarShowSession != undefined || requset.cookies.shenkarShowUserId != undefined){
	auth.authCookies(requset.cookies.shenkarShowSession, requset.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		var myProjects = [];
		var managerId =  requset.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);

	    department.findOne ({ manager : managerId}).exec (function (err, doc) {
	    	
	    project.find ({department: doc._id}).exec (function (err, projects) {
	    	
	    	response.json (projects);
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



exports.getUsers = function (req, res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		var myUsers = [];
		var managerId =  req.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);
		user.findOne ({_id : managerId}).exec (function (err, manager){
			
			department.findOne ({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	console.log ("department : " + doc);
	    	
	    	user.find ({ department : doc._id, role: "student"}).populate('department', 'name').
    where('user').ne ('PRIVATE').
    exec (function (err, departmentUsers) {
        console.log ('department Users: ' + departmentUsers);
        res.send (departmentUsers);
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


exports.createProject = function (request,response) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		projectController.createProject (request, response);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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


exports.updateProject = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		projectController.updateProject (request, response);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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


exports.deleteProject = function (request, response, files) {
	
		if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).populate('manager', 'name').exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		departmentProject.deleteProject (request, response);
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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


exports.createUser = function (request,response) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		
	    		if (request.body.role == "student")
	    		{
	    		userController.createUser (request, response);
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to create a student user."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	
	    	
	    	if (request.body.department ==  doc._id ){
	    		
	    		if (doc.role == "student") {
	    		userController.updateUser (request, response);
	    		}
	    		
	    		else {
	    			response.json ({error: "You are only authorized to update students."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		
	    		if (doc.role == "student") {
	    		userController.deleteUser (request, response);
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to delete students."});
	    		}
	    	}
	    	
	    	else {
	    
	    	response.json ({error: "you are not authorized in this department."});
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
