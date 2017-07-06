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
	
	if (req.headers['x-access-token'] != undefined){
	auth.authCookies(req.headers['x-access-token'], function (result) {
	
	if (result == 'department manager')
	{
		
		  var managerId =  req.headers['x-access-token'];
    		
user.findOne ({ _id: managerId}).exec (function (err, manager) {
	
	 department.find ({ _id : manager.department}).exec (function (err, docs) {
        
       
        res.json (docs);
        
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
	
	if (request.headers['x-access-token'] != undefined){
	auth.authCookies(request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
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
	
		if (request.headers['x-access-token'] != undefined){
	auth.authCookies(request.headers['x-access-token'], function (result) {

	if (result == 'institute manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
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
	
		if (request.headers['x-access-token'] != undefined){
	auth.authCookies(request.headers['x-access-token'], function (result) {

	if (result == 'institute manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
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




exports.getProjects = function (request,response) {
	
	if (request.headers['x-access-token'] != undefined){
	auth.authCookies(request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		var myProjects = [];
		var managerId =  request.headers['x-access-token'];

		
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	
	    	if (department){
	    	project.find ({departmentId: department._id}).populate('departmentId').populate('location').exec (function (err, projects) {
	    	
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
	
	if (req.headers['x-access-token'] != undefined){
	auth.authCookies(req.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		var myUsers = [];
		var managerId =  req.headers['x-access-token'];

		user.findOne ({_id : managerId}).exec (function (err, manager){
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	if (department){

	    	
	    	user.find ({ department : department._id, role: "student"}).populate('project').exec (function (err, departmentUsers) {

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
	
	if (request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {

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
	
		if (request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
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
	
		if (request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
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
	
	if (request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
				
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
	
		if ( request.headers['x-access-token'] != undefined){
	auth.authCookies(request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
	    	if (doc._id ){
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
	
		if ( request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		  var managerId =  request.headers['x-access-token'];
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			department.findOne({ _id : manager.department}).exec (function (err, doc) {
	    	
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
	
	if (req.headers['x-access-token'] != undefined){
	auth.authCookies( req.headers['x-access-token'], function (result) {

	if (result == 'department manager')
	{
		var myUsers = [];
		var managerId =  req.headers['x-access-token'];

		user.findOne ({_id : managerId}).exec (function (err, manager){
			
			department.findOne ({ _id : manager.department}).exec (function (err, department) {
	    	if (department){

	    	
	    	location.find ({ institute : manager.institute}).exec (function (err, locations) {

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