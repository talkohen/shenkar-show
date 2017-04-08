var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var location = require ('../schemes/location');
var route = require ('../schemes/route');




exports.getInstituteById  = function (req, res) {
	
	
	// id
	// name
	// logoUrl
	// primaryColor
	// secondaryColor
	// lineColor
	// mainTextColor
	// aboutText
	// aboutImageUrl
	
    
	var id = req.params.instituteId;
    console.log ('Dep ID = ' + id);

    institute.findOne ({_id : id}).exec (function (err, institute) {

	if (institute != undefined) {
		instJSON = {
			"id" : institute._id, 
			"name" : institute.name,
			"logoUrl" : "https://s3.amazonaws.com/shenkar-show2/" + institute.logo,
			"primaryColor": institute.primaryColor,
			"secondaryColor": institute.secondaryColor,
			"lineColor": institute.lineColor,
			"mainTextColor": institute.mainTextColor,
			"aboutText": institute.description,
			"aboutImageUrl": "https://s3.amazonaws.com/shenkar-show2/" + institute.image
			
		};
        
        res.json (instJSON);
        return;
    }
    
       
   else {
   	res.send ({error: "not found"}); 
   }
    }
    );


};

exports.getLocationById  = function (req, res) {
	
	//description
	//lat
	//lng
	//url
	
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
	
	//id
	//departmentId
	//name
	//description
	//studentNames
	//studentEmails
	//videoUrl
	//soundUrl
	// location
	
	
	var id = req.params.projectId;
    console.log ('Dep ID = ' + id);

	user.find ({project: id}). exec (function (err, students) {
		studentNamesArray  = [];
		studentEmailsArray  = [];
		for (i=0; i<students.length; i++) {
			
			studentNamesArray.push (students[i].name);
			studentEmailsArray.push (students[i].email);
		}
		
		console.log ("PROJECT : " + id);
		console.log ("STUDENTS : " + students);
		project.findOne ({_id : id}).populate('location').exec (function (err, project) {
			console.log ("PROJECT 2 : " + project);
			
		projJSON = {
			"id" : project._id, 
			"departmentId": project.department,
			"name" : project.name,
			"description" : project.description,
			"studentNames": studentNamesArray,
			"studentEmails": studentEmailsArray,
			"videoUrl" : "https://s3.amazonaws.com/shenkar-show2/" + project.video,
			"soundUrl" : "https://s3.amazonaws.com/shenkar-show2/" + project.audio, 
			"location" : project.location
			
		};
        
        res.json (projJSON);
        return;
    });
	
		
	});

	
	
};


exports.getRouteById  = function (req, res) {
	
	//name
	//projectIds
	
	var id = req.params.routeId;
    console.log ('Dep ID = ' + id);

    route.findOne ({_id : id}).exec (function (err, doc) {

		routeJSON = {
			"id" : doc._id, 
			"name" : doc.name,
			"projectIds" : doc.projectIds,
		};
        
        res.json (routeJSON);
        return;
    });
	
	
	
	
	
};

exports.getDepartmentById  = function (req, res) {
	
	//id
	//name
	//imageUrl
	//largeImageUrl
	//locationDescription
	
	var id = req.params.departmentId;
    console.log ('Dep ID = ' + id);

    department.findOne ({_id : id}).exec (function (err, doc) {

		depJSON = {
			"id" : doc._id, 
			"name" : doc.name,
			"imageUrl" : "https://s3.amazonaws.com/shenkar-show2/" + doc.logo,
			"largeImageUrl": "https://s3.amazonaws.com/shenkar-show2/" + doc.logo,
			"locationDescription": doc.location
		};
        
        res.json (depJSON);
        return;
    });
	
	
	
};

