var mongoose = require('mongoose');
var institute = require('../schemes/institute');
var department = require('../schemes/department');
var project = require('../schemes/project');
var user = require('../schemes/user');
var building = require('../schemes/building');
var location = require('../schemes/location');
var route = require('../schemes/route');
var fh = require('../fileHandler.js');

//Get all institutes in database
exports.getAllInstitutes = function(req, res) {

	institute.find({}).exec(function(err, docs) {

		res.json(docs);

	});
};

//Get institute by id
exports.getInstituteById = function(req, res) {
	var id = req.params.instituteId;

	institute.find({_id : id}).exec(function(err, docs) {

		res.json(docs);
	});
};


//Create a new institute
exports.createInstitute = function(request, response, files) {

	var logoKey = null;
	var imageKey = null;

	if (files != undefined) {
		if (files['logoUrl'] != undefined) {logoKey = "https://shenkar-show2.s3.amazonaws.com/" + files['logoUrl'][0].key;}
		else {logoKey = null;}

		if (files['aboutImageUrl'] != undefined) {imageKey = "https://shenkar-show2.s3.amazonaws.com/" + files['aboutImageUrl'][0].key;}
		else {imageKey = null;}
	}

	var building =null;
 	if (request.body.building != 'undefined') {building = request.body.building;}
	else {building = 0;}
 	
	institute.find({name : request.body.name}, function(err, doc) {

		var newInstitute = new institute({
			name : request.body.name,
			logoUrl : logoKey,
			primaryColor : request.body.primaryColor,
			secondaryColor : request.body.secondaryColor,
			lineColor : request.body.lineColor,
			mainTextColor : request.body.mainTextColor,
			aboutText : request.body.aboutText,
			aboutImageUrl : imageKey,
			building: building
		});

		try {

			newInstitute.save(function(error, result) {
				if (error) {
					console.error(error);
				} else {
					console.log("Saved document : " + doc);
					response.send(true);
				};
			});
		} catch (exception) {
			console.log(exception);
			response.send(false);
		}

	});

};


//Update an existing institute
exports.updateInstitute = function(request, response, files) {

	try {

		var logo = null;
		var image = null;

		institute.findOne({_id : request.body.id}).exec(function(err, doc) {

			if (files != undefined) {
				if (files['logoUrl'] != undefined) {logo = 'https://s3.amazonaws.com/shenkar-show2/' + files['logoUrl'][0].key;}
				else {logo = doc.logoUrl;}

				if (files['aboutImageUrl'] != undefined) {image = 'https://s3.amazonaws.com/shenkar-show2/' + files['aboutImageUrl'][0].key;}
				else {image = doc.aboutImageUrl;}
			}


			var query = doc.update({
				$set : {

					name : request.body.name,
					logoUrl : logo,
					primaryColor : request.body.primaryColor,
					secondaryColor : request.body.secondaryColor,
					lineColor : request.body.lineColor,
					mainTextColor : request.body.mainTextColor,
					aboutText : request.body.aboutText,
					aboutImageUrl : image,
					building: request.body.building

				}
			});

			query.exec(function(err, results) {
				console.log("Updated Institute number : " + doc._id);

			});

		});

		response.send(true);
	} catch (exception) {
		console.log(exception);
		return response.send(false);
	}

};

//Delete an existing institute
exports.deleteInstitute = function(request, response) {

	institute.findOne({_id : request.body.id}).exec(function(err, doc) {
		try {
			if (doc.logoUrl != null) {
				fh.delete(doc.logoUrl);
			}
			if (doc.aboutImageUrl != null) {
				fh.delete(doc.aboutImageUrl);
			}
			//Delete buildings, locations, routes, departments, projects, and users in institute as well
			building.remove({institute : doc.id}).exec(function(err, deletedDepartments) {
				location.remove({institute : doc.id}).exec(function(err, deletedDepartments) {
					route.remove({institute : doc.id}).exec(function(err, deletedDepartments) {
						department.remove({institute : doc.id}).exec(function(err, deletedDepartments) {
							project.remove({institute : doc.id}).exec(function(err, deletedProjects) {
								user.remove({institute : doc.id}).exec(function(err, deletedUsers) {
									doc.remove(function(err, deletedDoc) {
										response.send(true);
									});
								});
							});
						});
					});
				});
			});
		} catch (exception) {
			console.log(exception);
			response.send(false);
		}
	});
};
