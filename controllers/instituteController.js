var mongoose = require ('mongoose');
var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var user = require ('../schemes/user');
var credentials = require ('../credentials.js');

var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');
var fh = require ('../fileHandler.js');



AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

var s3 = new AWS.S3();







exports.getAllInstitutes = function (req, res) {

    institute.find ({}).exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};



exports.getInstituteById  = function (req, res) {
    var id = req.params.instituteId;
    console.log ('User ID = ' + id);

    institute.find ({_id : id}).exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};

exports.getInstituteByName  = function (req, res) {
    var name = req.params.instituteName;
    console.log ('Institute name = ' + name);

    institute.find ({name : name}).exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};

exports.createInstitute = function (request, response, files) {
	
	var logoKey =  null;
	var imageKey =  null ;
	
	if (files != undefined){
	if (files['logoUrl'] != undefined ) {
	logoKey = "https://shenkar-show2.s3.amazonaws.com/" + files['logoUrl'][0].key;	
	}
	else {
		logoKey = null;
	}
	
	if (files['aboutImageUrl'] != undefined ) {
	imageKey = "https://shenkar-show2.s3.amazonaws.com/" + files['aboutImageUrl'][0].key;	
	}
		else {
		imageKey = null;
	}
}
    institute.find({name : request.body.name },function(err, doc){
          	
             var newInstitute = new institute({
                name :request.body.name,
                logoUrl : logoKey,            
                primaryColor: request.body.primaryColor,
    			secondaryColor: request.body.secondaryColor,
    			lineColor: request.body.lineColor,
			    mainTextColor: request.body.mainTextColor,
			    aboutText: request.body.aboutText, 
    			aboutImageUrl: imageKey,
    			location: request.body.location,
    			path: request.body.path,
    			building: request.body.building


              });
              
           try {
           	console.log(request.files);
              newInstitute.save(function(error, result) {
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
            
          });    

};

exports.updateInstitute = function (request, response, files) {

	
	
	try {

	var logo = null;
	var image = null ;
	

			
		console.log ("INSTITUTE ID : " + request.body.id );
		institute.findOne({_id : request.body.id}).exec (function (err,doc) {
			
	if (files != undefined){
	if (files['logoUrl'] != undefined) { logo = 'https://s3.amazonaws.com/shenkar-show2/' + files['logoUrl'][0].key;} else {logo = doc.logourl; }
	if (files['aboutImageUrl'] != undefined) { image = 'https://s3.amazonaws.com/shenkar-show2/' + files['aboutImageUrl'][0].key;} else {image = doc.aboutImageUrl; }
	}
	
		
	 	var query = doc.update ({
	 		$set: {
	 			
                name :request.body.name,
                logoUrl : logo,            
                primaryColor: request.body.primaryColor,
    			secondaryColor: request.body.secondaryColor,
    			lineColor: request.body.lineColor,
			    mainTextColor: request.body.mainTextColor,
			    aboutText: request.body.aboutText, 
    			aboutImageUrl: image,
    			location: request.body.location,
    			path: request.body.path,
    			building: request.body.building


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


exports.deleteInstitute = function (request, response) {

	console.log ("INSTITUTE ID IN institute : " + request.body.id);
	
	 institute.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
		
			if (doc.logoUrl != null){
		fh.delete (doc.logoUrl );
		}
		if (doc.aboutImageUrl != null) {
	 	fh.delete (doc.aboutImageUrl);
	 		}
	 department.remove ({institute: doc.id}).exec (function (err, deletedDepartments) {
	 	project.remove ({institute: doc.id}).exec (function (err, deletedProjects) {
	 		user.remove ({institute: doc.id}).exec (function (err, deletedUsers) {
	 			doc.remove (function (err, deletedDoc) {
	 		institute.findOne ({_id: request.body.id}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  response.send (true);
	 		});
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
