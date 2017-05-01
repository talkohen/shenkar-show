var mongoose = require ('mongoose');
var institute = require ('../schemes/institute');
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
	
	var logoKey =  '';
	var imageKey =  '' ;
	
	if (files['logoUrl'] != undefined ) {
	logoKey = files['logoUrl'][0].key;	
	}
	
	if (files['aboutImageUrl'] != undefined ) {
	imageKey = files['aboutImageUrl'][0].key;	
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
    			aboutImageUrl: imageKey


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

	var logo = '';
	var image = '';
	if (files['logoUrl'] != undefined) { logo = files['logoUrl'][0];}
	if (files['aboutImageUrl'] != undefined) { image = files['aboutImageUrl'][0];}
		try {
	fh.update (logo, request.body.logoKey, function (logoKey) {
	
	fh.update (image, request.body.imageKey, function (imageKey) {
		
		
		console.log ("INSTITUTE ID : " + request.body.id );
		institute.findOne({_id : request.body.id}).exec (function (err,doc) {
	
		
	 	var query = doc.update ({
	 		$set: {
	 			
                name :request.body.name,
                logoUrl : logoKey,            
                primaryColor: request.body.primaryColor,
    			secondaryColor: request.body.secondaryColor,
    			lineColor: request.body.lineColor,
			    mainTextColor: request.body.mainTextColor,
			    aboutText: request.body.aboutText, 
    			aboutImageUrl: imageKey


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


exports.deleteInstitute = function (request, response) {

	
	
	 institute.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
		fh.delete (doc.logoUrl);
	 	fh.delete (doc.aboutImageUrl);
	 			
	 	var query = doc.remove (function (err, deletedDoc) {
	 		institute.findOne ({_id: request.body.id}, function (err, doc) {
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
