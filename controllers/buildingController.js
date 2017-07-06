var mongoose = require ('../database');
var location = require ('../schemes/location');
var building = require ('../schemes/building');


//return all buildings in database
exports.getAllBuildings = function (req, res) {

    building.find ({}).exec (function (err, buildings) {
        res.json (buildings);
        return;
    });
};


//search building by id
exports.getBuildingById  = function (req, res) {
    var id = req.params.buildingId;


    building.findOne ({_id : id}).exec (function (err, building) {
        res.json (building);
        return;
    });
};

exports.createBuilding = function (request, response) {
	
    var newBuilding = new building({

    name: request.body.name,
    location: request.body.location,
    locationDescription: request.body.locationDescription,
    zoom: request.body.zoom,
    institute: request.body.institute

                
    });
              
           try {
              newBuilding.save(function(error, result) {
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


exports.updateBuilding = function (request, response) {
	
	try {

	
	building.findOne({_id: request.body.id}).exec (function (err,building) {
		
			
	 	var query = building.update ({
	 		$set: {
	 			
           		name: request.body.name,
			    location: request.body.location,
			    locationDescription: request.body.locationDescription,
			    zoom: request.body.zoom,
			    institute: request.body.institute
	 		}	 		
	 	});
 	
 	 		query.exec (function (err, results) {});
 	      	console.log("Updated Doc : " + building);
        }); 

	response.send (true);  
}
catch (exception) {
	console.log (exception);
            	return response.send (false);
}

	
};



exports.deleteBuilding = function (request, response) {

	
	
	 building.findOne({_id : request.body.id}).exec (function (err,doc) {
	 		try {	
			
	
	 			
	 	var query = doc.remove (function (err, deletedDoc) {
	 		
                  response.send (true);
	 		
	 	});
	 	
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
	 	
	 });

};

