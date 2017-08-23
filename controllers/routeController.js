var mongoose = require ('../database');
var route = require ('../schemes/route');


//Get all routes in database
exports.getAllRoutes = function (req, res) {

    route.find ({}).exec (function (err, routes) {
        res.json (routes);
        return;
    });
};


//Search route by id
exports.getRouteById  = function (req, res) {
    var id = req.params.routeId;

    route.findOne ({_id : id}).exec (function (err, route) {
        res.json (route);
        return;
    });
};

//Create a new route
exports.createRoute = function (request, response) {
	
    var newRoute = new route({

    name: request.body.name,
    projectIds: request.body.projectIds,
    institute: request.body.institute

    });
              
    try {
        newRoute.save(function(error, result) {
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

//Update an existing route
exports.updateRoute = function (request, response) {

	try {

        route.findOne({_id: request.body.id}).exec (function (err,route) {

            var query = route.update ({
                $set: {

                    name: request.body.name,
                    projectIds: request.body.projectIds,
                    institute: request.body.institute

                }
            });

                query.exec (function (err, results) {});
                console.log("Updated Doc : " + route);
            }); //route

        response.send (true);
    }
    catch (exception) {
        console.log (exception);
        return response.send (false);
    }

	
};



exports.deleteRoute = function (request, response) {

	 route.findOne({_id : request.body.id}).exec (function (err,doc) {
         try {
             var query = doc.remove (function (err, deletedDoc) {
                 route.findOne ({_id: request.body.locationId}, function (err, doc) {
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

