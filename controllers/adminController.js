var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var building = require ('../schemes/building');
var departmentController = require ('../controllers/departmentController');
var instituteController = require ('../controllers/instituteController');
var userController = require ('../controllers/userController');
var auth = require ('../controllers/authController');
var async = require("async");

//Create a new institute
exports.createInstitute = function (request,response, files) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {
		
		if (result == 'admin')
			{

	    		instituteController.createInstitute (request, response, files);
			}
		else {
			
			response.json ({error: "invalid seesion token."});
			}
		}); 
	}
	else {
		response.json ({error: "no session."});
	}
};


//Update an institute
exports.updateInstitute = function (request, response, files) {
	
		if (request.headers['x-access-token'] != undefined){
			auth.authCookies(request.headers['x-access-token'], function (result) {	
			if (result == 'admin'){
		 
	    		instituteController.updateInstitute (request, response, files);   
			}
			else {
				response.json ({error: "invalid seesion token."});
				}
			});
		}
		else {
		response.json ({error: "no session."});
			}
};

//Delete an institute
exports.deleteInstitute = function (request, response) {

	
		if (request.headers['x-access-token'] != undefined){
			auth.authCookies(request.headers['x-access-token'], function (result) {
				if (result == 'admin'){
		
	    		instituteController.deleteInstitute (request, response);
	    		    
				}
				else {
					response.json ({error: "invalid seesion token."});
					}
			});
		}
		else {
			response.json ({error: "no session."});
			}
};




//Get all the institutes in the system
exports.getInstitutes = function (req,res) {
	
	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {
	
			if (result == 'admin'){

	    		institute.find ({}).exec (function (err, docs) {
	        		res.json (docs);
	       
	  			});

			}		
			else {
				res.send ("error: you not authorized to perform this action");
				}
		});
	}
	else {
		res.send ("error: you not authorized to perform this action");
	}
};


//Get all the institute managers in the system
exports.getUsers = function (req, res) {
	
	if (req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {
			if (result == 'admin'){
				user.find ({  role: "institute manager"}).populate('institute', 'name').exec (function (err, Users) {
        			res.send (Users);
    			});
			}
			else {
				res.send ("error: you not authorized to perform this action");
				}
		});
	}
	else {
		res.send ("error: you not authorized to perform this action");
		}
};

//Create a new institute manager
exports.createUser = function (request,response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'admin'){
		  		if (request.body.role == "institute manager"){
	    			userController.createUser (request, response);
	    		}
	    	
	    	else{
	    			response.json ({error: "You are only authorized to create a institute manager user."});
	    		}

			}
			else {
				response.json ({error: "invalid seesion token."});
				 }
		});
	}
	else {
		response.json ({error: "no session."});
		}
};


//Update institute manager
exports.updateUser = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {
			if (result == 'admin'){
		    		userController.updateUser (request, response);
			}
			else {
				response.json ({error: "invalid seesion token."});
				 }
		});
	 }
	else {
		response.json ({error: "no session."});
		 }
};

//Delete institute manager 
exports.deleteUser = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {
		
			if (result == 'admin'){
				  
			    		userController.deleteUser (request, response);  		
			}
			else {
			response.json ({error: "invalid seesion token."});
			}
		});
	 }
	else {
		response.json ({error: "no session."});
		 }
};


//Get all buildings 
exports.getBuildings = function (req, res) {
	
	if (req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {
			if (result == 'admin'){
				building.find ({}).exec (function (err, Buildings) {
        			res.send (Buildings);
    			});
			}
			else {
				res.send ("error: you not authorized to perform this action");
				}
		});
	}
	else {
		res.send ("error: you not authorized to perform this action");
		}
};