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
	
	
	var image1 = '';
	var image2 = '';
	var image3 = '';
	var image4 = '';
	var image5 = '';
	var video = '';
	var sound = '';
	
	
	if (files['imageUrl1'] != undefined) { image1 = files['imageUrl1'][0];}
	if (files['imageUrl2'] != undefined) { image2 = files['imageUrl2'][0];}
	if (files['imageUrl3'] != undefined) { image3 = files['imageUrl3'][0];}
	if (files['imageUrl4'] != undefined) { image4 = files['imageUrl4'][0];}
	if (files['imageUrl5'] != undefined) { image5 = files['imageUrl5'][0];}

	if (files['videoUrl'] != undefined) { video = files['videoUrl'][0];}
	if (files['soundUrl'] != undefined) { sound = files['soundUrl'][0];}
	
	console.log ("IMAGE1 : " + image1);
	console.log ("IMAGE2 : " + image2);
	console.log ("IMAGE3 : " + image3);
	console.log ("VIDEO : " + video);
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
						fh.update (video, request.body.videoKey, function (videoKey) {	
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
