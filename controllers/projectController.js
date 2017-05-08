var mongoose = require ('../database');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var fh = require ('../fileHandler.js');

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

    project.find ({_id : id}).
    where('project').ne ('PRIVATE').
    exec (function (err, docs) {
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


exports.createProject = function (request, response, files) {
	
	var imageKeys = [] ;
	var image1, image2, image3, image4, image5 , sound;
	
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
	


	
          	
             var newProject = new project({
             	
             	departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKeys,
                videoUrl : request.body.videoUrl,
                soundUrl : sound,
                location :request.body.location,
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
             


};

exports.updateProject = function (request, response, files) {
	
	
	var image1 = '';
	var image2 = '';
	var image3 = '';
	var image4 = '';
	var image5 = '';
	var sound = '';
	
	
	if (files['imageUrl1'] != undefined) { image1 = files['imageUrl1'][0];}	
	if (files['imageUrl2'] != undefined) { image2 = files['imageUrl2'][0];}	
	if (files['imageUrl3'] != undefined) { image3 = files['imageUrl3'][0];}	
	if (files['imageUrl4'] != undefined) { image4 = files['imageUrl4'][0];}	
	if (files['imageUrl5'] != undefined) { image5 = files['imageUrl5'][0];}	
	if (files['soundUrl'] != undefined) { sound = files['soundUrl'][0];}	
	
	console.log ("IMAGE1 : " + image1);
	console.log ("IMAGE2 : " + image2);
	console.log ("IMAGE3 : " + image3);
	console.log ("AUDIO : " + sound);
	
	console.log ("request.body.imageKey1 : " + request.body.imageKey1);
	console.log ("request.body.imageKey2 : " + request.body.imageKey2);
	console.log ("request.body.imageKey3 : " + request.body.imageKey3);
	console.log ("request.body.imageKey4 : " + request.body.imageKey4);
	console.log ("request.body.imageKey5 : " + request.body.imageKey5);
	
	
	try {
	
	
	fh.update (image1, request.body.imageKey1, function (imageKey1) {
		fh.update (image2, request.body.imageKey2, function (imageKey2) {
			fh.update (image3, request.body.imageKey3, function (imageKey3) {
				fh.update (image4, request.body.imageKey4, function (imageKey4) {
					fh.update (image5, request.body.imageKey5, function (imageKey5) {
							fh.update (sound, request.body.soundKey, function (audioKey) {
	
	project.findOne({_id: request.body.id}).exec (function (err,doc) {
		
		
		
	console.log ("imageKey1 : " + imageKey1);
	console.log ("imageKey2 : " + imageKey2);
	console.log ("imageKey3 : " + imageKey3);
	console.log ("imageKey4 : " + imageKey4);
	console.log ("imageKey5 : " + imageKey5);
		
		var imageKeys = [];
		console.log ("imageKey0: " + imageKeys);
		console.log ("imageKeys1 : " + imageKeys);
		
			if (imageKey1 != undefined) {imageKeys.push (imageKey1);}
			console.log ("imageKeys2 : " + imageKeys);
			if (imageKey2 != undefined) {imageKeys.push (imageKey2);}
			console.log ("imageKeys3 : " + imageKeys);
			if (imageKey3 != undefined) {imageKeys.push (imageKey3);}
			console.log ("imageKeys4 : " + imageKeys);
			if (imageKey4 != undefined) {imageKeys.push (imageKey4);}
			console.log ("imageKeys5 : " + imageKeys);
			if (imageKey5 != undefined) {imageKeys.push (imageKey5);}
			console.log ("imageKeys6 : " + imageKeys);
			
	 	var query = doc.update ({
	 		$set: {
	 			
           		departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKeys,
                videoUrl : request.body.videoUrl,
                soundUrl : audioKey,
                location :request.body.location,
                institute :request.body.institute
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		
 	});
 	      	
			console.log("Updated Doc : " + doc);
        

					 					}); //project
									
								}); //audio
						});	//image 5
					});//image 4
				});//image 3
			});//image 2
		});//image 1
	response.send (true);  
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
	 			
	 	var query = doc.remove (function (err, deletedDoc) {
	 		project.findOne ({_id: request.body.projectId}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  response.send (true);
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
