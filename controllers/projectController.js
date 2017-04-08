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
	
	
	var imageKey = '' ;
	var videoKey = '' ;
	var audioKey = '' ;
	
	
	if (files['imageUrl'] != undefined ) {
	imageKey = files['imageUrl'][0].key;	
	}
	
	if (files['videoUrl'] != undefined ) {
	videoKey = files['videoUrl'][0].key;	
	}
	
		if (files['soundUrl'] != undefined ) {
	audioKey = files['soundUrl'][0].key;	
	}
	
          	
             var newProject = new project({
             	
             	departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKey,
                videoUrl : videoKey,
                soundUrl : audioKey,
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
	
	
	var image = '';
	var video = '';
	var audio = '';
	
	if (files['imageUrl'] != undefined) { image = files['imageUrl'][0];}
	if (files['videoUrl'] != undefined) { video = files['videoUrl'][0];}
	if (files['soundUrl'] != undefined) { audio = files['soundUrl'][0];}
	
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
	 			
           		departmentId :request.body.departmentId,
                name :request.body.name,
                description :request.body.description,
                imageUrl : imageKey,
                videoUrl : videoKey,
                soundUrl : audioKey,
                location :request.body.location,
                institute :request.body.institute
                
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
