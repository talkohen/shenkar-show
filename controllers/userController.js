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



//Get all the users in the system. (for DEV only)
exports.getAllUsers = function (req, res) {

    user.find ({}).exec (function (err, docs) {
        res.json (docs);

    });
};

//Authenticate username and password
exports.auth = function (req, res) {
	
	if (req.body.userName == undefined || req.body.password == undefined ){
  		res.send ("missing parameters");
  	}
	else
    {
	     var userName = req.body.userName;
	     user.findOne().where('userName', userName).exec (function (err,doc) {
	 		    try {	
	 	         if (crypto.hashCheck (req.body.password, doc.password)) {
                institute.findOne ({_id : doc.institute}).exec (function (err, institute) {
                  department.findOne ({_id : doc.department}).exec (function (err, department) {
                    project.findOne ({_id : doc.project}).exec (function (err, project) {
                      newDoc = doc.toJSON ();
                      if (institute) {newDoc.instituteName = institute.name;}
                      if (department) {newDoc.departmentName = department.name;}
                      if (project) {newDoc.projectName = project.name;}

                      doc = newDoc;

	 		          res.cookie ("shenkarShowUserId", doc._id,  { expires: false, path: '/'});
	 		          res.send (doc);	
                      });
                    });
                  });
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


//Create a new user in the system
exports.createUser = function (request, response) {

    //Check if the username is already taken
    user.find({userName : request.body.userName },function(err, doc){

       if (doc.length){
            response.send ("user already exists");
          }
        else{
          	
            //Generate a new , 8 character long password
          	func.generatePassword(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', function (password) {
          	
             var newUser = new user({
             	role : request.body.role,
             	userName :request.body.userName,
                name :request.body.name,
                password : crypto.hashMake(password),
                email :request.body.email,
                department :request.body.department,
                institute :request.body.institute,
                project: request.body.project
              });
              
              try {
                  newUser.save(function(error, result) {
                    if (error) {
                      console.error(error);
                    }
                    else {                  
                          //If the user is created successfully, send him/her an email with the username and password.
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
                        			}, 
                          function(err, reply) {
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


//Update a user's details in the system.
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
     	
     	 	query.exec (function (err, result) {
     		 console.log ("updated User number: " + doc._id);
     	  });
              
        response.send (true);
                
     	}
     catch (exception) {
     	console.log (exception); 
     	response.send (false);
     }
  });
};


//Delete a user from the system
exports.deleteUser = function (request, response) {

	 user.findOne().where ({_id :  request.body.id}).exec (function (err,doc) {
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


//Create a new student in the system (with callback)
exports.createStudent = function (request, response, callback) {

    //Check if the username is already taken
    user.find({userName : request.body.userName },function(err, doc){
       if (doc.length){
            response.send ("user already exists");
          }
        else{
          	
            //Generate a new , 8 character long password
          	func.generatePassword(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', function (password) {
          	
                 var newUser = new user({
                   	role : request.body.role,
                   	userName :request.body.userName,
                    name :request.body.name,
                    password : crypto.hashMake(password),
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
                        
                          //If the user is created successfully, send him/her an email with the username and password.
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
            			        }, 
                          function(err, reply) {
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



//Update a student's details in the system (with callback)
exports.updateStudent = function (request, response, callback) {

	user.findOne({_id: request.body.id}).exec (function (err,doc) {
	
    try {	
	 	       var query = doc.update ({
	 		        $set: {
                name :request.body.name,
                email :request.body.email,
                project :request.body.project
	 		        }	 		
	 	       });
 	
 	 	       query.exec (function (err, result) {
 		       console.log ("updated Student: " + doc._id);
 	          });
 	      	
            callback (true);
            
 	  }
    catch (exception) {
 	    console.log (exception); 
 	    callback (false);
    }
  });
};

//Delete a user from the system
exports.deleteStudent = function (request, response, callback) {

	 user.findOne().where ({_id :  request.body.id}).exec (function (err,doc) {
	     try {	
	 	     var query = doc.remove (function (err, deletedDoc) {
            callback (true);
          });	
	 	    }
	 	   catch (exception) {
 	      console.log (exception); 
 	      callback (false);
      }
	 });
};


//Update a user's password
exports.updatePassword = function (request, response) {

	if (request.headers['x-access-token'] != undefined){
	     auth.authCookies( request.headers['x-access-token'], function (result) {
	
	         userID = request.headers['x-access-token'];

		       user.findOne().where ({_id :  userID}).exec (function (err,doc) { 
			         if (doc) {
			           if ( crypto.hashCheck(request.body.oldPassword, doc.password )) {
			             if (request.body.newPassword == request.body.reNewPassword) {
				
				              try {	
	 	                     var query = doc.update ({
	 		                      $set: {
                                password : crypto.hashMake( request.body.newPassword)
	 		                      }	 		
	 	                      });
 	
 	 	                      query.exec (function (err, result) {
                       		   console.log ("updated Password for user : " + doc._id);
                       	  });
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


