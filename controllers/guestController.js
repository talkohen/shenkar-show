var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var location = require ('../schemes/location');
var route = require ('../schemes/route');
var building = require ('../schemes/building');
var projectController = require ('./projectController.js');


//Get institute by ID
exports.getInstituteById  = function (req, res) {

	var id = req.params.instituteId;
    institute.findOne ({_id : id}).populate('location', 'description lat lng url id').populate('building', 'name location locationDescription zoom id').exec (function (err, instituteFound) {

		 var buildingLocation = {
		  path: 'building.location',
		  model: 'location'
		};

		if (institute) {
			institute.populate (instituteFound, buildingLocation , function (err, institutePopulatedBuilding) {
      			res.json(institutePopulatedBuilding);
    		});
		}
        else {
        res.send (instituteFound);
        }
    });
};

//Get all institute departments
exports.getInstituteDepartments = function (req, res) {
	
	var id = req.params.instituteId;

	department.find ({institute : id}).populate('location', 'description lat lng url id').populate('building', 'name  location locationDescription zoom id').exec (function (err, departments) {

		var buildingLocation = {
		  path: 'building.location',
		  model: 'location'
		};

		if (departments) {
			department.populate (departments, buildingLocation , function (err, departmentPopulatedBuilding) {
      		res.json(departmentPopulatedBuilding);
    		});
		}
        else {
        res.send (departments);
        }
	});
};

//Get all institute projects
exports.getInstituteProjects = function (req, res) {
	
	var id = req.params.instituteId;

	project.find ({institute : id}).populate('students').exec (function (err, projects) {
		res.send (projects);
	});
};

//Get all institute projects with locations
exports.getInstituteProjects2 = function (req, res) {
	
	var instituteId = req.params.instituteId;
	var departmentId = req.params.departmentId;

	project.find ({institute : instituteId , departmentId: departmentId}).populate('students').populate('location', 'description lat lng url id').exec (function (err, projects) {

		res.send (projects);
	});
		 
};

//Get location by id
exports.getLocationById  = function (req, res) {
	
	var id = req.params.locationId;

    location.findOne ({_id : id}).exec (function (err, doc) {

		if (doc != undefined) {
				locationJSON = {
					"id" : doc._id,
					"description" : doc.description,
					"lat" : doc.lat,
					"lng" : doc.lng,
					"url" : doc.url
				};

				res.json (locationJSON);
				return;
		}
    	else {
   			res.send ({error: "not found"});
   		}
   });
	
};

//Get project by id
exports.getProjectById = function (req, res) {
	
	var id = req.params.projectId;

	user.find ({project: id}). exec (function (err, students) {;
		
		studentNamesArray  = [];
		studentEmailsArray  = [];
		for (i=0; i<students.length; i++) {
			
			studentNamesArray.push (students[i].name);
			studentEmailsArray.push (students[i].email);
		}

		project.findOne ({_id : id}).populate('location', 'description lat lng url id').exec (function (err, project) {

			if (project !=null) {
					projJSON = {
						"id" : project._id,
						"departmentId": project.departmentId,
						"name" : project.name,
						"description" : project.description,
						"studentNames": studentNamesArray,
						"studentEmails": studentEmailsArray,
						"imageUrl" : project.imageUrl,
						"videoUrl" : project.videoUrl,
						"soundUrl" : project.soundUrl,
						"location" : project.location

					};

					res.json (projJSON);
					return;

			}
		   	else {res.send (null);}
       
    	});
	});

};


//Get route by id
exports.getRouteById  = function (req, res) {

	var id = req.params.routeId;

    route.findOne ({_id : id}).exec (function (err, doc) {
		if (doc != undefined) {
				routeJSON = {
					"id" : doc._id,
					"name" : doc.name,
					"projectIds" : doc.projectIds,
				};

				res.json (routeJSON);
				return;
		}
		else {res.send ({error: "not found"});}
    });
	
};

//Get department by id
exports.getDepartmentById  = function (req, res) {

	var id = req.params.departmentId;

    department.findOne ({_id : id}).populate('location', 'description lat lng url id').populate('building', 'name  location locationDescription zoom id').exec (function (err, departmentFound) {
	
	var buildingLocation = {
      path: 'building.location',
      model: 'location'
    };

		if (departmentFound) {
			institute.populate (departmentFound, buildingLocation , function (err, departmentPopulatedBuilding) {
			  	res.json(departmentPopulatedBuilding);
			});
		}
        else {
        res.send (departmentFound);
        }
    });
};

//Get all of department's projects
exports.getDepartmentProjects = function (req, res) {
	
	var id = req.params.departmentId;
	project.find ({departmentId : id}).populate('location', 'description lat lng url id').exec (function (err, projects) {
		
			res.send (projects);
		 });	 
};

//Get institute routes
exports.getInstituteRoutes = function (req, res) {
	var id = req.params.instituteId;
	
	route.find ({institute : id}).exec (function (err, routes){
		res.send (routes);
	});
	
};

//Get project by keyword string
exports.getProjectsBySearch = function (req, res) {
	
	var institute = req.params.instituteId;
	var keyword = req.params.keyword;
	project.find({$or: [{'institute': institute, 'name' : new RegExp (keyword, 'i')}, {'institute': institute, 'studentNames' : new RegExp (keyword, 'i')}  ]}).exec (function (err, projects) {

		res.send (projects);
	});
	
};


