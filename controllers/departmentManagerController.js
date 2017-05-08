var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var location = require ('../schemes/location');
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
user.findOne ({ _id: managerId}).exec (function (err, manager) {
	
	 department.findOne ({ _id : manager.department}).exec (function (err, docs) {
        Data = docs;
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


exports.createProject = function (request,response, files) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
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




exports.getProjects = function (requset,response) {
	
	if (requset.cookies.shenkarShowSession != undefined || requset.cookies.shenkarShowUserId != undefined){
	auth.authCookies(requset.cookies.shenkarShowSession, requset.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		var myProjects = [];
		var managerId =  requset.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);
		
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	
	    	if (department){
	    	project.find ({departmentId: department._id}).exec (function (err, projects) {
	    	
	    	response.json (projects);
	    	});
	    	}
	    	else {
	    		response.send ("{'error' : 'department not found'}");
	    	}
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
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	if (department){
	    	console.log ("department : " + department);
	    	
	    	user.find ({ department : department._id, role: "student"}).populate('project', 'name').exec (function (err, departmentUsers) {
        console.log ('department Users: ' + departmentUsers);
        res.send (departmentUsers);
      
    });
    }
	    	else {
	    		res.send ("{'error' : 'department not found'}");
	    	}
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


exports.createProject = function (request,response, files) {
	
	if (request.cookies.shenkarShowSession != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(request.cookies.shenkarShowSession, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.departmentId);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.departmentId ==  doc._id ){
	    		projectController.createProject (request, response, files);
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
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    
	    	console.log ("REQ ID : " + request.body.departmentId);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.departmentId ==  doc._id ){
	    		projectController.updateProject (request, response, files);
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
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.department);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.department ==  doc._id ){
	    		projectController.deleteProject (request, response);
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
	    			try {
	    		userController.createStudent (request, response , function (result) {
	    			if (result == true){
	    			projectController.updateStudentsInfo (request, response);
	    			response.send(true);
	    			}
	    			else {
	    				response.send (false);
	    			}
	    		});
	    		
	    		}
	    		catch (exception) {
			 	console.log (exception); 
			 	response.send (false);
			 	}
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
	    		user.findOne({ _id : request.body.id}).exec (function (err, user) {
	    		if (user.role == "student") {
	    			var oldProject = user.project;
	    			var newProject =request.body.project;
	    			try {
	    		userController.updateStudent (request, response , function (result) {
	    			if (result == true) {
	    			projectController.updateStudentsInfo2 (oldProject, newProject);
	    			response.send(true);
	    			}
	    			else {
	    				console.log ("STUDENT UPDATE ERROR");
	    				response.send(false);
	    			}
	    		});
	    		
	    		}
	    		catch (exception) {
			 	console.log (exception); 
			 	response.send (false);
			 	}
	    		}
	    		
	    		else {
	    			response.json ({error: "You are only authorized to update students."});
	    		}
	    		});
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
	    			user.findOne({ _id : request.body.id}).exec (function (err, user) {
	    		if (user.role == "student") {
	    			
	    			try {
	    		userController.deleteStudent (request, response , function (result) {
	    			if (result == true) {
	    			projectController.updateStudentsInfo (request, response);
	    			response.send(true);
	    			}
	    			else {
	    				response.send (false);
	    			}
	    		});
	    		
	    		}
	    		catch (exception) {
			 	console.log (exception); 
			 	response.send (false);
			 	}
	    		}
	    		else {
	    			response.json ({error: "You are only authorized to delete students."});
	    		}
	    		});
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


exports.getLocations = function (req, res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'department manager')
	{
		var myUsers = [];
		var managerId =  req.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);
		user.findOne ({_id : managerId}).exec (function (err, manager){
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	if (department){
	    	console.log ("department : " + department);
	    	
	    	location.find ({ institute : manager.institute}).exec (function (err, locations) {
        console.log ('locations: ' + locations);
        res.send (locations);
      
    });
    }
	    	else {
	    		res.send ("{'error' : 'department not found'}");
	    	}
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