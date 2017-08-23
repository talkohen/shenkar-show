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


//Get student's project info
exports.getProject = function (request, response ) {
	
	if ( request.headers['x-access-token'] != undefined){
		auth.authCookies(request.headers['x-access-token'], function (result) {
			if (result == 'student')
			{
				var studentId =  request.headers['x-access-token'];
				user.findOne ({_id : studentId}).exec (function (err , student) {
					project.find ({ _id : student.project}).populate('location').exec (function (err, doc) {
						console.log ('doc: ' + doc);
						response.json (doc);
						return;
					});
				});
			}
			else {
				response.send ({error: "You are not authorized to access this project"});
			}
		});
	}
	else {
		response.send ({error: "You are not authorized to access this project"});
	}
};




//Update student's project
exports.updateProject = function (request, response, files) {
	
		if ( request.headers['x-access-token'] != undefined){
			auth.authCookies( request.headers['x-access-token'], function (result) {
				if (result == 'student') {
					var studentId =  request.headers['x-access-token'];
					user.findOne ({ _id: studentId}).exec (function (err, student) {
						project.findOne({ _id : student.project}).exec (function (err, doc) {
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
			});
		}
		else {
			response.json ({error: "no session."});
		}
};

