var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var project = require ('../schemes/project');
var crypto = require ('../crypto');
var func = require ('../functions'); 
var auth = require ('../controllers/authController');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendmail = require('sendmail')();




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
		console.log (req.body.userName);
		console.log (req.body.password);
	var userName = req.body.userName;
	var query = user.findOne().where ('userName', userName);
	
	
	 query.exec (function (err,doc) {
	 		try {	
	 	if (doc.password == req.body.password) {
	 		if (doc.role == "admin"){
	 			
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		doc.shenkarShowSession = crypto.hashMake (doc.email);
	 		
	 		res.send (doc);
	 		
	 		}
	 		
	 		else if 
	 		(doc.role == "institute manager"){
	 			doc["shenkarShowSession"] = crypto.hashMake (doc.email);
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		
	 		console.log (doc);
	 		institute.findOne ({_id : doc.institute}).exec (function (err, institute) {
	 			
	 			console.log ("institute 111 : " + institute); 
	 			if (institute) {
	 				newDoc = doc.toJSON ();
	 				console.log ("new doc 1" + newDoc);
	 				newDoc.instituteName = institute.name;
	 				console.log ("new doc 1.5" + newDoc);
	 				console.log ("insti name : " + institute.name);
	 				doc = newDoc;
	 				console.log ("new doc 2" + doc);
	 				}
	 		res.send (doc);
	 		});
	 		
	 		}
	 		
	 		else if 
	 		(doc.role == "department manager"){
	 			
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		
	 		console.log (doc);
	 		department.findOne ({_id : doc.department}).exec (function (err, department) {
	 			institute.findOne ({_id : doc.institute}).exec (function (err, institute) {
	 				
	 			console.log ("department 111 : " + department); 
	 			if (department) {
	 				newDoc = doc.toJSON ();
	 				console.log ("new doc 1" + newDoc);
	 				newDoc.departmentName = department.name;
	 				if (institute) {newDoc.instituteName = institute.name;}
	 				console.log ("new doc 1.5" + newDoc);
	 				console.log ("department name : " + department.name);
	 				doc = newDoc;
	 				console.log ("new doc 2" + doc);
	 				}
	 		res.send (doc);
	 		});
	 		});
	 		}
	 		
	 		
	 		else if (doc.role == "student"){
	 		res.cookie ("shenkarShowSession", crypto.hashMake (doc.email),  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		res.cookie ("shenkarShowUserName", doc.name,  { expires: false, path: '/'});
	 		
			console.log (doc);
	 		project.findOne ({_id : doc.project}).exec (function (err, project) {
	 			institute.findOne ({_id : doc.institute}).exec (function (err, institute) {
	 			console.log ("project 111 : " + project); 
	 			if (project) {
	 				newDoc = doc.toJSON ();
	 				console.log ("new doc 1" + newDoc);
	 				newDoc.projectName = project.name;
	 				if (institute) {newDoc.instituteName = institute.name;}
	 				console.log ("new doc 1.5" + newDoc);
	 				console.log ("project name : " + project.name);
	 				doc = newDoc;
	 				console.log ("new doc 2" + doc);
	 				}
	 		res.send (doc);
	 		});
	 		});

	 		}
	 		
	 		else {
	 			res.cookie ("shenkar-show", "guest",  { expires: false, httpOnly: true });
	 			
	 		}
	 		
	 	}
	 	else {
	 		res.send (false);
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
          	
          	func.generatePassword(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', function (password) {
          	
             var newUser = new user({
             	role : request.body.role,
             	userName :request.body.userName,
                name :request.body.name,
                password : password,
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
                  
                  sendmail({
    		from: 'shenkar-show@shenkar-show.co.il',
    		to: request.body.email,
    		subject: 'הזמנה לתערוכת שנקר',
    		html: 	'<div style = "text-align: center">'+
    				'<h1>תערוכת שנקר</h1>'+
    				'<img src = "https://s3.amazonaws.com/shenkar-show2/ic_launcher.png" style = "width:50px; height:50px"> <br>'+
    				'.שלום, משתמש חדש נוצר עבורך באתר תערוכת שנקר<br> : שם המשתמש <br> ' + 
    				'<span style = "color: red; font-weight: bold">'+
    				request.body.userName +'</span><br>'+
    				' : סיסמא <br>' + 
    				'<span style = "color: red; font-weight: bold">'+
    				password+'</span><br><br>'+
    				'<a href = "https://shenkar-show-web-new.herokuapp.com/#/login">מעבר לאתר</a>'+
    				'</div>' ,
  			}, function(err, reply) {
    		console.log(err && err.stack);
    		console.dir(reply);
				});
                  

                  response.send (true);
                };
              });
              }
               catch (exception) {
 	console.log (exception); 
 	response.send (false);
 }
 });
            } 
           
          });    
};

exports.updateUser = function (request, response) {

	var department = null;
	if (request.body.department != undefined) {department = request.body.department;}

	user.findOne({_id: request.body.id}).exec (function (err,doc) {
	
	try {	
	 	var query = doc.update ({
	 		$set: {
                name :request.body.name,
                email :request.body.email,
                department : department,
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
          	
          	func.generatePassword(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', function (password) {
          	
             var newUser = new user({
             	role : request.body.role,
             	userName :request.body.userName,
                name :request.body.name,
                password : password,
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
                  
                  sendmail({
    		from: 'shenkar-show@shenkar-show.co.il',
    		to: request.body.email,
    		subject: 'הזמנה לתערוכת שנקר',
    		html: 	'<div style = "text-align: center">'+
    				'<h1>תערוכת שנקר</h1>'+
    				'<img src = "https://s3.amazonaws.com/shenkar-show2/ic_launcher.png" style = "width:50px; height:50px"> <br>'+
    				'.שלום, משתמש חדש נוצר עבורך באתר תערוכת שנקר<br> : שם המשתמש <br> ' + 
    				'<span style = "color: red; font-weight: bold">'+
    				request.body.userName +'</span><br>'+
    				' : סיסמא <br>' + 
    				'<span style = "color: red; font-weight: bold">'+
    				password+'</span><br><br>'+
    				'<a href = "https://shenkar-show-web-new.herokuapp.com/#/login">מעבר לאתר</a>'+
    				'</div>' ,
  			}, function(err, reply) {
    		console.log(err && err.stack);
    		console.dir(reply);
				});
                  

                  callback (true);
                };
              });
              }
               catch (exception) {
 	console.log (exception); 
 	callback (false);
 }
 });
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


exports.updatePassword = function (request, response) {
	if (request.headers['x-access-token'] != undefined){
	auth.authCookies( request.headers['x-access-token'], function (result) {
	
	userID = request.headers['x-access-token'];
	
		user.findOne().where ({_id :  userID}).exec (function (err,doc) { 
			if (doc) {
			if (doc.password == request.body.oldPassword) {
			if (request.body.newPassword == request.body.reNewPassword) {
				
				try {	
	 	var query = doc.update ({
	 		$set: {
                password :request.body.newPassword
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
			
			
			}
			else {
				response.send ({error: "new passwords dont match."});
			}
			}
			else {
				response.send ({error: "incorrect password."});
			}
		}
		else {
				response.send ({error: "user not found."});
			}
		});
		


	});
	}
	else {
				response.send ({error: "no session."});
			}
};

// 
// exports.updatePassword = function (request, response) {
// 	
		// if (request.headers['x-access-token'] != undefined){
	// auth.authCookies( request.headers['x-access-token'], function (result) {
	// console.log ("userType : " + result);
// 	
	// if (request.headers['x-access-token'] == requset.body.id) {
// 	
	// user.findOne().where ({_id :  request.body.id}).exec (function (err,doc) { 
// 		
		// if (doc.password == request.body.oldPassword) {
			// if (request.body.newPassword == request.body.reNewPassword) {
// 			
// 			
			// try {	
	 	// var query = doc.update ({
	 		// $set: {
                // password :request.body.newPassword
	 		// }	 		
	 	// });
//  	
 	 	// query.exec (function (err, results) {
 		// console.log ("\n Resulets Object : " + JSON.stringify (results));
 	// });
//  	      	
			// console.log("Updated Doc : " + doc);
            // callback (true);
//             
 	// }
 // catch (exception) {
 	// console.log (exception); 
 	// callback (false);
 // }
// 				
		// }
// 		
				// else {
			// response.send ("new passwords dont match");
		// }
		// }
// 
		// else {
			// response.send ("wrong password");
		// }
// 		
	// });
// else {
	// response.send ("not authorized!");
// }
	// });
	 // }
	// else {
		// response.send ("not authorized!");
	// }
// 	
// };
