var mongoose = require ('../database');
var user = require ('../schemes/user');
var crypto = require ('../crypto');


exports.getAllUsers = function (req, res) {

    user.find ({}).
    where('user').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
};

exports.auth = function (req, res) {
	
	if (req.body.userName == undefined || req.body.password == undefined ) {
		res.send ("missing parameters");
	}
	else {
	var userName = req.body.userName;
	var query = user.findOne().where ('userName', userName);
	
	
	 query.exec (function (err,doc) {
	 		try {	
	 	if (doc.password == req.body.password) {
	 		if (doc.role == "admin"){
	 			
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		res.send (doc);
	 		
	 		}
	 		
	 		else if 
	 		(doc.role == "institute manager"){
	 			
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		res.send (doc);
	 		
	 		
	 		}
	 		
	 		else if 
	 		(doc.role == "department manager"){
	 			
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		res.send (doc);
	 		
	 		}
	 		
	 		
	 		else if (doc.role == "student"){
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		res.send (doc);
	 		}
	 		
	 		else {
	 			res.cookie ("shenkar-show", "guest",  { expires: false, httpOnly: true });
	 			
	 		}
	 		
	 	}
	 	else {
	 		res.send ("fail");
	 	}
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	res.send (false);
 }
	 	
	 });
	}
 
};


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
};

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
};

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
                department :request.body.department,
                institute :request.body.institute,
                project: request.body.project
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
};

exports.updateUser = function (request, response) {



	user.findOne({_id: request.body.id}).exec (function (err,doc) {
	
	try {	
	 	var query = doc.update ({
	 		$set: {
                name :request.body.name,
                email :request.body.email,
                department :request.body.department,
                institute :request.body.institute
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
};


exports.deleteUser = function (request, response) {

	 user.findOne().where ({_id :  request.body.id}).exec (function (err,doc) {
	 		try {	
	 	var query = doc.remove (function (err, deletedDoc) {
	 		user.findOne ({_id: request.body.id}, function (err, doc) {
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



exports.createStudent = function (request, response, callback) {

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
                department :request.body.department,
                institute :request.body.institute,
                project: request.body.project
              });
              
           try {
              newUser.save(function(error, result) {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Saved document : " + doc);
                  callback (true);
                };
              });
              }
               catch (exception) {
 	console.log (exception); 
 	callback (false);
 }
            }
          });    
};




exports.updateStudent = function (request, response, callback) {



	user.findOne({_id: request.body.id}).exec (function (err,doc) {
	
	try {	
	 	var query = doc.update ({
	 		$set: {
                name :request.body.name,
                email :request.body.email,
                department :request.body.department,
                institute :request.body.institute,
                project :request.body.project
	 		}	 		
	 	});
 	
 	 	query.exec (function (err, results) {
 		console.log ("\n Resulets Object : " + JSON.stringify (results));
 	});
 	      	
			console.log("Updated Doc : " + doc);
            callback (true);
            
 	}
 catch (exception) {
 	console.log (exception); 
 	callback (false);
 }

 });
};

exports.deleteStudent = function (request, response, callback) {

	 user.findOne().where ({_id :  request.body.id}).exec (function (err,doc) {
	 		try {	
	 	var query = doc.remove (function (err, deletedDoc) {
	 		user.findOne ({_id: request.body.id}, function (err, doc) {
	 			console.log("Removed doc : " + doc);
                  callback (true);
	 		});
	 	});
	 	
	 	}
	 	catch (exception) {
 	console.log (exception); 
 	callback (false);
 }
	 	
	 });

};
