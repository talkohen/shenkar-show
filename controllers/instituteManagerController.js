var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var departmentController = require ('../controllers/departmentController');
var location = require ('../schemes/location');
var locationController = require ('../controllers/locationController');
var route = require ('../schemes/route');
var routeController = require ('../controllers/routeController');
var userController = require ('../controllers/userController');
var project = require ('../schemes/project');
var auth = require ('../controllers/authController');
var async = require("async");


exports.getIndex = function (req,res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		
		  var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
		user.findOne ({_id : managerId}).exec (function (err, manager) {
			
		institute.findOne ({ _id : manager.institute}).exec (function (err, doc) {
        Data = doc;
        console.log ('doc: ' + doc);
        res.json (doc);
        return;
    		});
			
		}); 	
}
else {
res.send (false);
}
	}); }
	else {
		res.send (false);
	}
};

exports.createDepartment = function (request,response, files) {
	
	if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
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
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
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
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
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
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
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

exports.getDepartment = function (req,res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var departmentId =  req.params.departmentId;
		
		var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
    		
    		user.findOne ({_id : managerId}).exec (function (err , manager) {

    		department.findOne ({ _id : departmentId}).exec (function (err, docs) {
    			
    			if(manager.institute == docs.institute) {
        			console.log ('docs: ' + docs);
        			res.json (docs);
       			}
       			
       			else {
       				res.send (false);
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



exports.getUsers = function (req, res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var myUsers = [];
		var managerId =  req.cookies.shenkarShowUserId;
		console.log ('User ID = ' + managerId);
		
		user.findOne ({_id : managerId}).exec (function (err, manager){
		
	    institute.findOne ({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	console.log ("INSTITUTE : " + doc);
	    	
	    	user.find ({ institute : doc._id, role: "department manager"}).populate('institute', 'name').populate('department', 'name').
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
	
	if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
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
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	
	    	
	    	if (request.body.institute ==  doc._id ){
	    		user.findOne ({ _id : request.body.id}).exec (function (err, depManager) {
	    		if (depManager.role == "department manager") {
	    		userController.updateUser (request, response);
	    		}
	    		
	    		else {
	    			response.json ({error: "You are only authorized to update department managers."});
	    		}
	    		});
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
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	
	    	
	    	if (request.body.institute ==  doc._id ){
	    		user.findOne ({ _id : request.body.id}).exec (function (err, depManager) {
	    		if (depManager.role == "department manager") {
	    		userController.deleteUser (request, response);
	    		}
	    		
	    		else {
	    			response.json ({error: "You are only authorized to delete department managers."});
	    		}
	    		});
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


exports.createLocation = function (request,response) {
	
	if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		locationController.createLocation (request, response);
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


exports.updateLocation = function (request, response) {
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		locationController.updateLocation (request, response);
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


exports.deleteLocation = function (request, response) {
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		locationController.deleteLocation (request, response);
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






exports.getLocations = function (req,res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
    		
    		user.findOne ({_id : managerId}).exec (function (err , manager) {

    location.find ({ institute : manager.institute}).exec (function (err, docs) {
    
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



exports.createRoute = function (request,response) {
	
	if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		routeController.createRoute (request, response);
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


exports.updateRoute = function (request, response) {
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		routeController.updateRoute (request, response);
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


exports.deleteRoute = function (request, response) {
	
		if (1 != undefined || request.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, request.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		  var managerId =  request.cookies.shenkarShowUserId;
		user.findOne ({ _id: managerId}).exec (function (err, manager) {
			
			institute.findOne({ _id : manager.institute}).exec (function (err, doc) {
	    	
	    	
	    	
	    	console.log ("REQ ID : " + request.body.institute);
	    	console.log ("DOC ID : " + doc._id);
	    	
	    	if (request.body.institute ==  doc._id ){
	    		routeController.deleteRoute (request, response);
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






exports.getRoutes = function (req,res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
    		
    		user.findOne ({_id : managerId}).exec (function (err , manager) {

    route.find ({ institute : manager.institute}).exec (function (err, docs) {
    
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

exports.getProjects = function (req,res) {
	
	if (1 != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(1, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);
    		
    		user.findOne ({_id : managerId}).exec (function (err , manager) {

    project.find ({ institute : manager.institute}).exec (function (err, docs) {
    
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