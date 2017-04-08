var mongoose = require ('../database');
var department = require ('../schemes/department');
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
			"imageUrl" : doc.logo,
			"largeImageUrl": doc.logo,
			"locationDescription": doc.location
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

exports.getDepartmentByName  = function (req, res) {
    var name = req.params.name;
    console.log ('department name = ' + department);

    department.find ({name : name}).
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};


exports.createDepartment = function (request, response, files) {
	
	

	var logoKey = null;
	var imageKey = null ;
	
	if (files['logo'] != undefined ) {
	logoKey = files['logo'][0].key;	
	}
	
	if (files['image'] != undefined ) {
	imageKey = files['image'][0].key;	
	}



    department.find({name : request.body.name },function(err, doc){
       if (doc.length){
            console.log("department already exists");
            response.send ("department already exists");
          }else{
          	
             var newDepartment = new department({
                name :request.body.name,
               	institute : request.body.institute,
                description :request.body.description,
                logo : logoKey,
                image : imageKey,
                location: request.body.location

              });
              
           try {
              newDepartment.save(function(error, result) {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Saved document : " + doc);
                  response.send (true);
                };
              });
              }
               catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
            }
          });    

};


exports.updateDepartment = function (request, response, files) {

	var logo = '';
	var image = '';
	if (files['logo'] != undefined) { logo = files['logo'][0];}
	if (files['image'] != undefined) { image = files['image'][0];}
	
	try {
	fh.update (logo, request.body.logoKey, function (logoKey) {
	
	fh.update (image, request.body.imageKey, function (imageKey) {
		
		
	 department.findOne({_id: request.body.id}).exec (function (err,doc) {
	
	 	var query = doc.update ({
	 		$set: {
	 			name :request.body.name,
               	institute : request.body.institute,
                description :request.body.description,
                logo : logoKey,
                image : imageKey,
                location: request.body.location
	 		}
	 	});

 	 	query.exec (function (err, results) {
 	 		
 	});
 	      	
			console.log("Updated Doc : " + doc);
        

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



exports.deleteDepartment = function (request, response) {

	
	
	 department.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
		fh.delete (doc.logo);
	 	fh.delete (doc.image);
	 			
	 	var query = doc.remove (function (err, deletedDoc) {
	 		department.findOne ({_id: request.body.departmentId}, function (err, doc) {
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


