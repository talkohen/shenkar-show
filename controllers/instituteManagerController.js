var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var user = require ('../schemes/user');
var department = require ('../schemes/department');
var building = require ('../schemes/building');
var departmentController = require ('../controllers/departmentController');
var location = require ('../schemes/location');
var locationController = require ('../controllers/locationController');
var buildingController = require ('../controllers/buildingController');
var route = require ('../schemes/route');
var routeController = require ('../controllers/routeController');
var userController = require ('../controllers/userController');
var project = require ('../schemes/project');
var auth = require ('../controllers/authController');
var async = require("async");


//Get info about the institute
exports.getIndex = function (req,res) {

	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies(req.headers['x-access-token'], function (result) {
			console.log ("userType : " + result);
			if (result == 'institute manager')
			{

				var managerId =  req.headers['x-access-token'];
				console.log ('User ID = ' + managerId);
				user.findOne ({_id : managerId}).exec (function (err, manager) {

					console.log ("MANAGER INSTITUTE : " + manager.institute );
					institute.find ({ _id : manager.institute}).exec (function (err, doc) {
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



//Create a new department in institute
exports.createDepartment = function (request,response, files) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {

			if (result == 'institute manager') {
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							departmentController.createDepartment (request, response, files);
						}

						else {response.json ({error: "you are not authorized in this institute."});}
					});

				});

			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Update an existing department in institute
exports.updateDepartment = function (request, response, files) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {

		if (result == 'institute manager')
		{
			var managerId =  request.headers['x-access-token'];
			user.findOne ({ _id: managerId}).exec (function (err, manager) {

				institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

					if (request.body.institute ==  doc._id ){
						departmentController.updateDepartment (request, response, files);
					}

					else {response.json ({error: "you are not authorized in this institute."});}
				});

			});

		}
		else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Delete an existing department in institute
exports.deleteDepartment = function (request, response, files) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							departmentController.deleteDepartment (request, response, files);
						}
						else {response.json ({error: "you are not authorized in this institute."});}
					});
				});
			}
			else {response.json ({error: "invalid seesion token."});}
			});
	}
	else {response.json ({error: "no session."});
	}
};


//Get institute's departments
exports.getDepartments = function (req,res) {
	
	if (req.headers['x-access-token'] != undefined){
	
		auth.authCookies( req.headers['x-access-token'], function (result) {

		if (result == 'institute manager')
		{
			var managerId =  req.headers['x-access-token'];
			user.findOne ({_id : managerId}).exec (function (err , manager) {

				department.find ({ institute : manager.institute}).exec (function (err, docs) {

					res.json (docs);
				});

			});

		}
		else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};

//Get a department in the institute
exports.getDepartment = function (req,res) {
	
	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies(req.headers['x-access-token'], function (result) {
			if (result == 'institute manager') {
				var departmentId =  req.params.departmentId;
				var managerId =  req.headers['x-access-token'];

					user.findOne ({_id : managerId}).exec (function (err , manager) {
						department.findOne ({ _id : departmentId}).exec (function (err, docs) {

						if(manager.institute == docs.institute) {res.json (docs);}
						else {res.send (false);}
						});

					});
			}
			else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};

//Get institute's department managers
exports.getUsers = function (req, res) {
	
	if (req.headers['x-access-token'] != undefined){
		
		auth.authCookies(req.headers['x-access-token'], function (result) {
			if (result == 'institute manager')
			{

				var managerId =  req.headers['x-access-token'];
				user.findOne ({_id : managerId}).exec (function (err, manager){
					institute.findOne ({ _id : manager.institute}).exec (function (err, doc) {
						user.find ({ institute : doc._id, role: "department manager"}).populate('institute', 'name').populate('department', 'name').exec (function (err, instituteUsers) {

							res.send (instituteUsers);
						});
					});
		  		});

			}
			else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};

//Create a new department manager in institute
exports.createUser = function (request,response) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				  var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {
					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){

							if (request.body.role == "department manager")
							{userController.createUser (request, response);}
							else {response.json ({error: "You are only authorized to create a department manager user."});}
						}
						else {response.json ({error: "you are not authorized in this institute."});}
					});

				});

			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Update an existing department manager in institute
exports.updateUser = function (request, response) {
	
		if (request.headers['x-access-token'] != undefined){
			auth.authCookies( request.headers['x-access-token'], function (result) {

				if (result == 'institute manager') {

					var managerId =  request.headers['x-access-token'];
					user.findOne ({ _id: managerId}).exec (function (err, manager) {
						institute.findOne({ _id : manager.institute}).exec (function (err, doc) {


							if (request.body.institute ==  doc._id ){
								user.findOne ({ _id : request.body.id}).exec (function (err, depManager) {
									if (depManager.role == "department manager")
									{userController.updateUser (request, response);}
									else {response.json ({error: "You are only authorized to update department managers."});}
								});
							}
							else {response.json ({error: "you are not authorized in this institute."});}
						});
					});
				}
				else {response.json ({error: "invalid seesion token."});}
			});
		}
	else {response.json ({error: "no session."});}
};

//Delete an existing department manager in institute
exports.deleteUser = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {
					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							user.findOne ({ _id : request.body.id}).exec (function (err, depManager) {
							if (depManager.role == "department manager") {
							userController.deleteUser (request, response);
							}

							else {response.json ({error: "You are only authorized to delete department managers."});}
							});
						}

						else {response.json ({error: "you are not authorized in this institute."});}
					});

				});

			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});
	}
};

//Create a new location in institute
exports.createLocation = function (request,response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {
			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							locationController.createLocation (request, response);
						}
						else {response.json ({error: "you are not authorized in this institute."});}
					});

				});

			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Update an existing location in institute
exports.updateLocation = function (request, response) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {
		if (result == 'institute manager')
		{
			var managerId =  request.headers['x-access-token'];
			user.findOne ({ _id: managerId}).exec (function (err, manager) {
				institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

					if (request.body.institute ==  doc._id ){
						locationController.updateLocation (request, response);
					}

					else {response.json ({error: "you are not authorized in this institute."});}
				});
			});
		}
		else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};


//Delete an existing location in institute
exports.deleteLocation = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

					if (request.body.institute ==  doc._id ){
						locationController.deleteLocation (request, response);
					}

					else {response.json ({error: "you are not authorized in this institute."});}
					});
				});
			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};





//Get institute's locations
exports.getLocations = function (req,res) {
	
	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  req.headers['x-access-token'];
				user.findOne ({_id : managerId}).exec (function (err , manager) {
					location.find ({ institute : manager.institute}).exec (function (err, docs) {

						res.json (docs);
					});
				});
			}
			else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};


//Create a new route in institute
exports.createRoute = function (request,response) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				  var managerId =  request.headers['x-access-token'];
					user.findOne ({ _id: managerId}).exec (function (err, manager) {

						institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

							if (request.body.institute ==  doc._id ){
								routeController.createRoute (request, response);
							}
							else {response.json ({error: "you are not authorized in this institute."});}
							});
					});

			}
			else {response.json ({error: "invalid seesion token."});}
				});
	}
	else {response.json ({error: "no session."});}
};

//Update an existing route in institute
exports.updateRoute = function (request, response) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {
					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							routeController.updateRoute (request, response);
						}

						else {response.json ({error: "you are not authorized in this institute."});}
					});
				});
			}
			else {response.json ({error: "invalid seesion token."});}
		});
		}
	else {response.json ({error: "no session."});}
};

//Delete an existing route in institute
exports.deleteRoute = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							routeController.deleteRoute (request, response);
						}
						else {response.json ({error: "you are not authorized in this institute."});}
					});

				});
			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Get institute routes
exports.getRoutes = function (req,res) {
	
	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies(req.headers['x-access-token'], function (result) {
			if (result == 'institute manager') {
				var managerId =  req.headers['x-access-token'];
				user.findOne ({_id : managerId}).exec (function (err , manager) {
					route.find ({ institute : manager.institute}).exec (function (err, docs) {

						res.json (docs);
					});
				});

			}
			else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};

//Get institute projects
exports.getProjects = function (req,res) {
	
	if ( req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  req.headers['x-access-token'];
				user.findOne ({_id : managerId}).exec (function (err , manager) {
					project.find ({ institute : manager.institute}).exec (function (err, docs) {

						res.json (docs);
					});

				});

			}
			else {res.send ("not authorized!");}
		});
	}
	else {res.send ("not authorized!");}
};


//Create a new building in institute
exports.createBuilding = function (request,response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {
			if (result == 'institute manager') {

				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {
					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							buildingController.createBuilding (request, response);
						}
						else {response.json ({error: "you are not authorized in this institute."});}
					});
				});
			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Update an existing building in institute
exports.updateBuilding = function (request, response) {
	
	if (request.headers['x-access-token'] != undefined){
		auth.authCookies( request.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  request.headers['x-access-token'];
				user.findOne ({ _id: managerId}).exec (function (err, manager) {

					institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

						if (request.body.institute ==  doc._id ){
							buildingController.updateBuilding (request, response);
						}

						else {response.json ({error: "you are not authorized in this institute."});}
					});
				});
			}
			else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};

//Delete an existing building in institute
exports.deleteBuilding = function (request, response) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {
		console.log ("userType : " + result);
		if (result == 'institute manager')
		{
			var managerId =  request.headers['x-access-token'];
			user.findOne ({ _id: managerId}).exec (function (err, manager) {
				institute.findOne({ _id : manager.institute}).exec (function (err, doc) {

					if (request.body.institute ==  doc._id ){
						buildingController.deleteBuilding (request, response);
					}
					else {response.json ({error: "you are not authorized in this institute."});}
				});
			});
		}
		else {response.json ({error: "invalid seesion token."});}
		});
	}
	else {response.json ({error: "no session."});}
};





//Get institute buildings
exports.getBuildings = function (req,res) {
	
	if (req.headers['x-access-token'] != undefined){
		auth.authCookies( req.headers['x-access-token'], function (result) {

			if (result == 'institute manager')
			{
				var managerId =  req.headers['x-access-token'];
				user.findOne ({_id : managerId}).exec (function (err , manager) {
					building.find ({ institute : manager.institute}).populate('location', 'description lat lng url id').exec (function (err, docs) {

						res.json (docs);
					});
				});
			}
			else {res.send ("not authorized!");}
			});
	}
	else {res.send ("not authorized!");}
};