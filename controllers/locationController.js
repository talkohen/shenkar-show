var mongoose = require ('../database');
var location = require ('../schemes/location');


//Get all locations in database
exports.getAllLocations = function (req, res) {

    location.find ({}).exec (function (err, locations) {
        res.json (locations);
        return;
    });
};


//Search location by id
exports.getLocationById  = function (req, res) {
    var id = req.params.locationId;

    location.findOne ({_id : id}).exec (function (err, location) {
        res.json (location);
        return;
    });
};

//Create a new location
exports.createLocation = function (request, response) {
	
    var newLocation = new location({
             
    description: request.body.description,
    lat: request.body.lat,
    lng: request.body.lng,
    url: request.body.url,
    institute: request.body.institute

                
    });
              
    try {
        newLocation.save(function(error, result) {
            if (error) {
                  console.error(error);
                }
            else {
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

//Update an existing location
exports.updateLocation = function (request, response) {
	
	try {

        location.findOne({_id: request.body.id}).exec (function (err,location) {

            var query = location.update ({
                $set: {

                    description: request.body.description,
                    lat: request.body.lat,
                    lng: request.body.lng,
                    url: request.body.url,
                    institute: request.body.institute
                }
            });

                query.exec (function (err, results) {});
                console.log("Updated Doc : " + location);
        });

        response.send (true);
    }
    catch (exception) {
        console.log (exception);
        return response.send (false);
    }

	
};


//Delete an existing location
exports.deleteLocation = function (request, response) {

	 location.findOne({_id : request.body.id}).exec (function (err,doc) {
         try {
             doc.remove (function (err, deletedDoc) {
                 location.findOne ({_id: request.body.locationId}, function (err, doc) {
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

