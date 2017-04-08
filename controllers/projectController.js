var mongoose = require ('../database');
var project = require ('../schemes/project');
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
	
	//id
	//departmentId
	//name
	//description
	// location
	
	
	var imageKey = null ;
	var videoKey = null ;
	var audioKey = null ;
	
	
	if (files['image'] != undefined ) {
	imageKey = files['image'][0].key;	
	}
	
	if (files['video'] != undefined ) {
	videoKey = files['image'][0].key;	
	}
	
		if (files['audio'] != undefined ) {
	audioKey = files['image'][0].key;	
	}
	
          	
             var newProject = new project({
                name :request.body.name,
                institute :request.body.institute,
                department :request.body.department,
                description :request.body.description,
                image : imageKey,
                video : videoKey,
                audio : audioKey,
                location :request.body.location
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
	
	
	var image = '';
	var video = '';
	var audio = '';
	
	if (files['image'] != undefined) { image = files['image'][0];}
	if (files['video'] != undefined) { video = files['video'][0];}
	if (files['audio'] != undefined) { audio = files['audio'][0];}
	
	console.log ("IMAGE : " + image);
	console.log ("VIDEO : " + video);
	console.log ("AUDIO : " + audio);
	
	try {
	
	
	fh.update (image, request.body.imageKey, function (imageKey) {
		
	fh.update (video, request.body.videoKey, function (videoKey) {	
		
	fh.update (audio, request.body.audioKey, function (audioKey) {
		
	project.findOne({_id: request.body.id}).exec (function (err,doc) {
	
	 	var query = doc.update ({
	 		$set: {
	 			name :request.body.name,
                institute :request.body.institute,
                department :request.body.department,
                description :request.body.description,
                image : imageKey,
                video : videoKey,
                audio : audioKey,
                location :request.body.location
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {
 	 		
 	});
 	      	
			console.log("Updated Doc : " + doc);
        

 });
		
	});
	});
	});
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
	 	fh.delete (doc.video);
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
