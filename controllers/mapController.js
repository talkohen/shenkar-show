var mongoose = require ('../database');
var map = require ('../schemes/map');
var user = require ('../schemes/user');
var fh = require ('../fileHandler.js');




exports.createMap = function (request, response, files) {
	
	

	var imageKey = null ;
	
	if (files != undefined) {

	if (files['imageUrl'] != undefined ) {
		
	imageKey = "https://shenkar-show2.s3.amazonaws.com/" + files['imageUrl'][0].key;	
	
	}
}
 	
             var newMap = new map({
             	institute : request.body.institute,
                imageUrl : imageKey
              });
              
           try {
              newMap.save(function(error, result) {
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


exports.updateMap = function (request, response, files) {

	var image = null;

	
	try {
		
			
		
	 map.findOne({_id: request.body.id}).exec (function (err,doc) {
	 	
	 	if (files != undefined) {
	if (files['imageUrl'] != undefined) { image = 'https://s3.amazonaws.com/shenkar-show2/' + files['imageUrl'][0].key;} else {image = doc.imageUrl;}
	}
	
	 	var query = doc.update ({
	 		$set: {
                institute : request.body.institute,				
                imageUrl : image
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

	
	
	 map.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
	 	fh.delete (doc.imageUrl);
	 	
	 			doc.remove (function (err, deletedDoc) {
                  response.send (true);

	 	});

	 	}
	 	catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
	 	
	 });

};