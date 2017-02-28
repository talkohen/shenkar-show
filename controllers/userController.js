var mongoose = require ('../database');
var user = require ('../schemes/user');

exports.getAllUsers = function (req, res) {

    user.find ({}).
    where('user').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}



exports.getUserById  = function (req, res) {
    var id = req.params.userId;
    console.log ('User ID = ' + id);

    user.find ({_id : id}).
    where('user').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}

exports.getUserByName  = function (req, res) {
    var name = req.params.userName;
    console.log ('User name = ' + name);

    user.find ({name : name}).
    where('user').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}

exports.createUser = function (request, response) {

    user.find({userName : request.body.userName },function(err, doc){
       if (doc.length){
            console.log("user already exists");
            response.send ("user already exists");
          }else{
          	
             var newUser = new user({
             	role : request.body.role,
             	userName :request.body.userName,
                name :request.body.name,
                password :request.body.password,
                email :request.body.email,
                department :request.body.department
              });
              
           try {
              newUser.save(function(error, result) {
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




}

exports.updateUser = function (request, response) {

	 var query = user.findOne().where ('userName', request.body.userName);
	 
	 query.exec (function (err,doc) {
	
	try {	
	 	var query = doc.update ({
	 		$set: {
	 			role : request.body.role,
             	userName :request.body.userName,
                name :request.body.name,
                password :request.body.password,
                email :request.body.email,
                department :request.body.department
	 		}	 		
	 	});
 	
 	 	query.exec (function (err, results) {
 		console.log ("\n Resulets Object : " + JSON.stringify (results));
 	});
 	      	
			console.log("Updated Doc : " + doc);
            response.send (true);
            
 	}
 catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }

 });
}


exports.deleteUser = function (request, response) {

	var query = user.findOne().where ('userName', request.body.userName);
	
	 query.exec (function (err,doc) {
	 		try {	
	 	var query = doc.remove (function (err, deletedDoc) {
	 		user.findOne ({userName: request.body.userName}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  response.send (true);
	 		})
	 	});
	 	
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
	 	
	 });

}

