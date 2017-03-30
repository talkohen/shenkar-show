var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var departmentController = require ('../controllers/departmentController');
var auth = require ('../controllers/authController');
var async = require("async");

exports.getIndex = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		
		  var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);

    institute.find ({ manager : managerId}).populate('manager', 'name').
    where('institute').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
		
		
	
}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
}

exports.getUpdate = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		
		  var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);

    institute.find ({ manager : managerId}).populate('manager', 'name').
    where('institute').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
		
		
	
}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
}

exports.getDepartments = function (req,res) {
	
	if (req.cookies.shenkarShowSession != undefined || req.cookies.shenkarShowUserId != undefined){
	auth.authCookies(req.cookies.shenkarShowSession, req.cookies.shenkarShowUserId, function (result) {
	console.log ("userType : " + result);
	if (result == 'institute manager')
	{
		var myDepartments = [];
		  var managerId =  req.cookies.shenkarShowUserId;
    		console.log ('User ID = ' + managerId);

    institute.findOne ({ manager : managerId}).populate('manager', 'name').
    where('institute').ne ('PRIVATE').
    exec (function (err, doc) {
        departments = doc.departments;
        
        

async.each(departments, function(depart, callback){
   
    departmentController.getDepartmentById2(depart, function (dep){
      
    		myDepartments.push (dep);
    	
      callback();
    });
  },

  function(err){
    res.json (myDepartments);
  }
);

        

        

    });
		
		
		
	
}
else {
	res.send ("not authorized!");
}
	}); }
	else {
		res.send ("not authorized!");
	}
}
