var mongoose = require ('../database');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var fh = require ('../fileHandler.js');
var func = require ('../functions'); 

//return all projects in database
exports.getAllProjects = function (req, res) {

    project.find ({}).exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};


//search project by id
exports.getProjectById  = function (req, res) {
    var id = req.params.projectId;
    console.log ('project ID = ' + id);

    project.find ({_id : id}).exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};

//search project by id
exports.getProjectById2  = function (projectId, callback) {
    var id = projectId;
    console.log ('Dep ID = ' + id);

    project.findOne ({_id : id}).exec (function (err, doc) {
    	console.log ('dasdasd');
        callback (doc);
    });
};

//search project by name
exports.getProjectByName  = function (req, res) {
    var name = req.params.projectName;
    console.log ('project name = ' + name);

    project.find ({name : name}).
    where('project').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};

// exports.getProjectByStudents = function  getProjectByStudents (students) {
// 	
// 	
// 	
// };


exports.createProject = function (request, response, files) {
	
	var imageKeys = [] ;
	var image1, image2, image3, image4, image5 , sound;
	if (files != undefined) {
		if (files['imageUrl1'] != undefined ) {
	image1 = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl1'][0].key;	
	imageKeys.push(image1);
	}
		else {
		image1 = null;
	}
	
	if (files['imageUrl2'] != undefined ) {
	image2 = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl2'][0].key;	
	imageKeys.push(image2);
	}
		else {
		image2 = null;
	}
	
	if (files['imageUrl3'] != undefined ) {
	image3 = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl3'][0].key;	
	imageKeys.push(image3);
	}
		else {
		image3 = null;
	}
	
	if (files['imageUrl4'] != undefined ) {
	image4 = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl4'][0].key;	
	imageKeys.push(image4);
	}
		else {
		image4 = null;
	}
	
	if (files['imageUrl5'] != undefined ) {
	image5 = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl5'][0].key;	
	imageKeys.push(image5);
	}
		else {
		image5 = null;
	}
	
	if (files['soundUrl'] != undefined ) {
	sound = "https://shenkar-show2.s3.amazonaws.com/" + files['soundUrl'][0].key;	
	}
		else {
		sound = null;
	}
	
}

var location =null;

console.log ("location : " + location);

console.log ("request.body.location 0 : " +request.body.location );

if (request.body.location != 'undefined') { console.log ("request.body.location : " + request.body.location); location = request.body.location; } else { location = 1;}

var video = null;
if (request.body.videoUrl != 'undefined') { video = request.body.videoUrl; }
	
          	func.getYoutubeSuffix(video, function (videoSuffix) {
             var newProject = new project({
             	
             	departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKeys,
                videoUrl : videoSuffix,
                soundUrl : sound,
                location :location,
                institute :request.body.institute
                
              });
           
           try {
              newProject.save(function(error, result) {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Saved document : " + result);
                  response.send (true);
                };
              });
              }
               catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
             
});

};

exports.updateProject = function (request, response, files) {
	
	
	var image1 = null;
	var image2 = null;
	var image3 = null;
	var image4 = null;
	var image5 = null;
	var sound = null;
	
	var location =null;

console.log ("location : " + location);

console.log ("request.body.location 0 : " +request.body.location );

if (request.body.location != 'undefined') { console.log ("request.body.location : " + request.body.location); location = request.body.location; } else { location = 1;}


	
	try {
	
	
	project.findOne({_id: request.body.id}).exec (function (err,doc) {
		
		if (files != undefined) {
	
	if (files['imageUrl1'] != undefined) { image1 = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl1'][0].key;}	else {image1 = doc.imageUrl[0];}
	if (files['imageUrl2'] != undefined) { image2 = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl2'][0].key;}	else {image2 = doc.imageUrl[1];}
	if (files['imageUrl3'] != undefined) { image3 = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl3'][0].key;}	else {image3 = doc.imageUrl[2];}
	if (files['imageUrl4'] != undefined) { image4 = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl4'][0].key;}	else {image4 = doc.imageUrl[3];}
	if (files['imageUrl5'] != undefined) { image5 = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl5'][0].key;}	else {image5 = doc.imageUrl[4];}
	if (files['soundUrl'] != undefined) { sound = 'https://s3.amazonaws.com/shenkar-show2/' + files['soundUrl'][0].key;}	else {sound = doc.soundUrl;}
	}
		
		

		
		var imageKeys = [];

		
			if (image1 != undefined) {imageKeys.push (image1);}
			if (image2 != undefined) {imageKeys.push (image2);}
			if (image3 != undefined) {imageKeys.push (image3);}
			if (image4 != undefined) {imageKeys.push (image4);}
			if (image5 != undefined) {imageKeys.push (image5);}
			
			var video = null;
if (request.body.videoUrl != 'undefined') { video = request.body.videoUrl; }
	
          	func.getYoutubeSuffix(video, function (videoSuffix) {
			
	 	var query = doc.update ({
	 		$set: {
	 			
           		departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKeys,
                videoUrl : videoSuffix,
                soundUrl : sound,
                location : location,
                institute :request.body.institute
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		
 	});
 	      	
			console.log("Updated Doc : " + doc);
        

					 					}); //project
									
	response.send (true);  
	});
}
catch (exception) {
	console.log (exception);
            	return response.send (false);
}

	
};



exports.deleteProject = function (request, response) {

	
	
	 project.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
		
	 	fh.delete (doc.image);
	 	fh.delete (doc.audio);
	 	user.remove ({project: doc.id}).exec (function (err, deletedUsers) {		
	 		doc.remove (function (err, deletedDoc) {
	 		project.findOne ({_id: request.body.projectId}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  response.send (true);
	 		});
	 	});
	 	});
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
	 	
	 });

};


exports.updateStudentsInfo = function (req, res) {
	
	console.log ("UPDATING STUDENTS INFO...");
	
	try {

project.findOne ({_id : req.body.project}).exec(function (err, project) {
	user.find ({project: req.body.project }).exec (function (err, students) {

			
		var studentNames =[];
		var studentEmails = [];
		
		if (students) {
			for ( i=0 ; i<students.length; i++) {
				studentNames.push (students[i].name);
				studentEmails.push (students[i].email);
				
			}
		}
		
		var query = project.update ({
	 		$set: {
	 			
                studentNames: studentNames,
                studentEmails: studentEmails
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		return (true);
 			});
			
		});
	});
		}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 	}
};

exports.updateStudentsInfo2 = function (oldProject, newProject) {
	
	console.log ("UPDATING STUDENTS INFO 2...");
	try {

project.findOne ({_id : oldProject}).exec(function (err, project) {
	user.find ({project: oldProject }).exec (function (err, students) {

			
		var studentNames =[];
		var studentEmails = [];
		
		if (students) {
			for ( i=0 ; i<students.length; i++) {
				studentNames.push (students[i].name);
				studentEmails.push (students[i].email);
				
			}
		}
		
		var query = project.update ({
	 		$set: {
	 			
                studentNames: studentNames,
                studentEmails: studentEmails
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		return (true);
 			});
			
		});
	});
		}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 	}
 	
 	try {

project.findOne ({_id : newProject}).exec(function (err, project) {
	user.find ({project: newProject }).exec (function (err, students) {

			
		var studentNames =[];
		var studentEmails = [];
		
		if (students) {
			for ( i=0 ; i<students.length; i++) {
				studentNames.push (students[i].name);
				studentEmails.push (students[i].email);
				
			}
		}
		
		var query = project.update ({
	 		$set: {
	 			
                studentNames: studentNames,
                studentEmails: studentEmails
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		return (true);
 			});
			
		});
	});
		}
	 	catch (exception) {
 	console.log (exception); 
 	return (false);
 	}
	
	
};


exports.getInstituteProjects = function (req, res) {
	
		if ( req.headers['x-access-token'] != undefined){

		var userId =  req.headers['x-access-token'];
    		console.log ('User ID = ' + userId);
    		
    		user.findOne ({_id : userId}).exec (function (err , user) {
    			if (user != undefined){
if (user.institute != undefined) {
    project.find ({ institute : user.institute}).exec (function (err, docs) {
    
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
       
    });
	}	
	else {
		res.send ("you are not authorized in this institute");
	}
	}
	else {
		res.send ("not authorized!");
	}
		
	});

	}
	else {
		res.send ("not authorized!");
	}
	
};