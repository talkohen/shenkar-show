var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var location = require ('../schemes/location');
var route = require ('../schemes/route');
var building = require ('../schemes/building');
var projectController = require ('./projectController.js');



exports.getInstituteById  = function (req, res) {

	
	var id = req.params.instituteId;
    console.log ('Dep ID = ' + id);

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


exports.getInstituteDepartments = function (req, res) {
	
	var id = req.params.instituteId;
	var resultArray = [];
	
	
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


exports.getInstituteProjects = function (req, res) {
	
	var id = req.params.instituteId;
	var resultArray = [];
	
	
	project.find ({institute : id}).populate('students').exec (function (err, projects) {
		

			res.send (projects);
		
		
		 });
		 
};

exports.getInstituteProjects2 = function (req, res) {
	
	var instituteId = req.params.instituteId;
	var departmentId = req.params.departmentId;
	var resultArray = [];
	
	
	project.find ({institute : instituteId , departmentId: departmentId}).populate('students').populate('location', 'description lat lng url id').exec (function (err, projects) {
		

			res.send (projects);
		
		
		 });
		 
};


exports.getLocationById  = function (req, res) {
	
	var id = req.params.locationId;
    console.log ('Dep ID = ' + id);

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
   }
    
    );
	
};

exports.getProjectById = function (req, res) {
	
	var id = req.params.projectId;
    console.log ('Dep ID = ' + id);

	user.find ({project: id}). exec (function (err, students) {
		console.log ("students : " + students);
		
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
       else {
       	res.send (null);
       }
       
    });
	
		
	});

	
	
};


exports.getRouteById  = function (req, res) {
	

	var id = req.params.routeId;
    console.log ('Dep ID = ' + id);

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
           else {
   	res.send ({error: "not found"}); 
   }
    });
	
	
	
	
	
};

exports.getDepartmentById  = function (req, res) {
	
	
	var id = req.params.departmentId;
    console.log ('Dep ID = ' + id);
    

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

exports.getDepartmentProjects = function (req, res) {
	
	var id = req.params.departmentId;
	
	
	project.find ({departmentId : id}).populate('location', 'description lat lng url id').exec (function (err, projects) {
		
			res.send (projects);
		
		
		 });	 
};


exports.getInstituteRoutes = function (req, res) {
	var id = req.params.instituteId;
	
	route.find ({institute : id}).exec (function (err, routes){
		
		res.send (routes);
	});
	
};

exports.getProjectsBySearch = function (req, res) {
	
	var institute = req.params.instituteId;
	var keyword = req.params.keyword;
	var result = [];
	project.find({$or: [{'institute': institute, 'name' : new RegExp (keyword, 'i')}, {'institute': institute, 'studentNames' : new RegExp (keyword, 'i')}  ]}).exec (function (err, projects) {

		res.send (projects);
	});
	
};


