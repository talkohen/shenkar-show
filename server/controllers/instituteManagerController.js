var mongoose = require ('../database');
var user = require ('../schemes/user');
var institute = require ('../schemes/institute');
var department = require ('../schemes/department');
var auth = require ('../controllers/authController');

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
        
        console.log ("DEPS : " + departments);
        
        for (i=0; i<departments.length; i++) {
        	department.findOne ({_id: departments[i]}).
    	where('department').ne ('PRIVATE').
    	exec (function (err, dep) {
    		
    		console.log ("DEP :  " + dep);
    		myDepartments.push (dep);
    		console.log ("myDeps :  " + myDepartments);
    		
    		 });
        }
        
        Data = myDepartments;
        console.log ('docs: ' + myDepartments);
        res.json (myDepartments);
        
        
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
