var mongoose = require ('../database');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var fh = require ('../fileHandler.js');


exports.getAllDepartments = function (req, res) {

    department.find ({}).
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};


exports.getDepartmentById  = function (req, res) {
    var id = req.params.departmentId;
    console.log ('Dep ID = ' + id);

    department.findOne ({_id : id}).exec (function (err, doc) {

		appJSON = {
			"id" : doc._id, 
			"name" : doc.name,
			"imageUrl" : doc.imageUrl,
			"largeImageUrl": doc.largeImageUrl,
			"locationDescription": doc.locationDescription
		};
        
        res.json (appJSON);
        return;
    });
};

exports.getDepartmentById2  = function (depId, callback) {
    var id = depId;
    console.log ('Dep ID = ' + id);

    department.findOne ({_id : id}).
    where('department').ne ('PRIVATE').
    exec (function (err, doc) {
    	console.log ('dasdasd');
        callback (doc);
    });
};


exports.createDepartment = function (request, response, files) {
	
	

	var logoKey = null;
	var imageKey = null ;
	
	if (files != undefined) {
	
	if (files['imageUrl'] != undefined ) {
	logoKey = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl'][0].key;	
	}
		else {
		logoKey = null;
	}
	
	if (files['largeImageUrl'] != undefined ) {
	imageKey = "https://shenkar-show2.s3.amazonaws.com/" + files['largeImageUrl'][0].key;	
	}
	else {
		imageKey = null;
	}
}

          	
          	
             var newDepartment = new department({
                name :request.body.name,
                imageUrl : logoKey,
                largeImageUrl : imageKey,
                locationDescription: request.body.locationDescription,
                institute : request.body.institute

              });
              
           try {
              newDepartment.save(function(error, result) {
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


exports.updateDepartment = function (request, response, files) {

	var logo = null;
	var image = null;

	
	try {
		
			
		
	 department.findOne({_id: request.body.id}).exec (function (err,doc) {
	 	
	 	if (files != undefined) {
	if (files['imageUrl'] != undefined) { logo = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl'][0].key;} else {logo = doc.imageUrl;}
	if (files['largeImageUrl'] != undefined) { image = 'https://s3.amazonaws.com/shenkar-show2/' + files['largeImageUrl'][0].key;} else {image = doc.largeImageUrl;}
	}
	
	 	var query = doc.update ({
	 		$set: {
                name :request.body.name,
                imageUrl : logo,
                largeImageUrl : image,
                locationDescription: request.body.locationDescription,
                institute : request.body.institute
	 		}
	 	});

 	 	query.exec (function (err, results) {
 	 		
 	});
 	      	
			console.log("Updated Doc : " + doc);
        

 });
		
	response.send (true);  
}
catch (exception) {
	console.log (exception);
            	return response.send (false);
}

	
};



exports.deleteDepartment = function (request, response) {

	
	
	 department.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
		fh.delete (doc.logo);
	 	fh.delete (doc.image);
	 	
	 	project.remove ({departmentId: doc.id}).exec (function (err, deletedProjects) {
	 		user.remove ({department: doc.id}).exec (function (err, deletedUsers) {
	 			doc.remove (function (err, deletedDoc) {
	 		department.findOne ({_id: request.body.departmentId}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  response.send (true);
	 		});
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


