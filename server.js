/*
*
* Shenkar show Server
*
*
* */

var express= require ('express');
var app = express();
var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');
var credentials = require ('./credentials.js');
var cookieParser = require('cookie-parser');
var cors = require('cors');

// Multer - S3 file uploader
AWS.config.update({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey
});

var s3 = new AWS.S3();

var upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'shenkar-show2',
		limits: { fileSize: 1000*1000*1 },
		fileFilter: function (req, file, cb) {
			if (file.mimetype !== 'image/png' || file.originalname =='') {
				req.fileValidationError = 'goes wrong on the mimetype';
				return cb(null, false, new Error('goes wrong on the mimetype'));
			}
			file.key = '';
			cb(null, true);
		},
		metadata: function (req, file, cb) {
			cb(null, {fieldName: file.fieldname});
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString() + '.' + mime.extension(file.mimetype));
		}
	})
});


//Controllers
var authController = require ('./controllers/authController');
var userController = require ('./controllers/userController');
var instituteController = require ('./controllers/instituteController');
var departmentController = require ('./controllers/departmentController');
var projectController = require ('./controllers/projectController');
var adminController = require ('./controllers/adminController');
var instituteManagerController = require ('./controllers/instituteManagerController');
var departmentManagerController = require ('./controllers/departmentManagerController');
var studentController = require ('./controllers/studentController');
var guestController = require ('./controllers/guestController');

//Body parser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true})); 

//CORS
app.use(cors());

//Cookie parser

app.use(cookieParser());

var path = require('path');

//Schemas
var user = require ('./schemes/user');
var institute = require ('./schemes/institute');
var department = require ('./schemes/department');
var project = require ('./schemes/project');

var port = process.env.PORT || 3000;
app.set ('port',port);
app.use ('/' , express.static ('./public'));

//Headers
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", 'https://shenkar-show-web-new.herokuapp.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", 'set-cookie');
  app.set ('json spaces', 4);
  res.set ("Content-Type", "application/json");
  next();
});


//Users
app.get ('/allUsers', userController.getAllUsers);
app.post ('/users/auth', userController.auth);
app.get ('/logout', authController.logout);
app.get ('/session', authController.getSession);
app.post ('/users/create', userController.createUser);
app.post ('/users/update', userController.updateUser);
app.post ('/users/delete', userController.deleteUser);
app.post ('/updatePassword', userController.updatePassword);


//Institutes
app.get ('/allInstitutes', instituteController.getAllInstitutes);
app.get ('/institutes/id/:instituteId', instituteController.getInstituteById);
app.post ('/institutes/create', upload.fields([{name : 'logoUrl', maxCount : 1 } ,{name : 'aboutImageUrl', maxCount : 1 }]) , function(req, res){instituteController.createInstitute(req,res, req.files);});
app.post ('/institutes/update', upload.fields([{name : 'logoUrl', maxCount : 1 } ,{name : 'aboutImageUrl', maxCount : 1 }]) , 
	function(req, res){
		if (req.files){
			instituteController.updateInstitute(req,res, req.files);}
		else {
			instituteController.updateInstitute(req,res);
		}
	});
app.post ('/institutes/delete', instituteController.deleteInstitute);

//Departments
app.get ('/allDepartments', departmentController.getAllDepartments);
app.get ('/departments/id/:departmentId', departmentController.getDepartmentById);
app.post ('/departments/create', upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'largeImageUrl', maxCount : 1 }]) ,function(req, res){departmentController.createDepartment(req,res, req.files);});
app.post ('/departments/update',  upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'largeImageUrl', maxCount : 1 }]) ,
	function(req, res){
		if (req.files){
			departmentController.updateDepartment(req,res, req.files);
		}
		else {
			departmentController.updateDepartment(req,res);
		}
	});
app.post ('/departments/delete', departmentController.deleteDepartment);

//Projects
app.get ('/allProjects', projectController.getAllProjects);
app.get ('/projects/id/:projectId', projectController.getProjectById);
app.post ('/projects/create', upload.fields([{name : 'imageUrl', maxCount : 1 } , {name : 'soundUrl', maxCount : 1 }]) ,function(req, res){projectController.createProject(req,res, req.files);} );
app.post ('/projects/update', upload.fields([{name : 'imageUrl', maxCount : 1 } , {name : 'soundUrl', maxCount : 1 }]) ,
 	function(req, res){
		if (req.files){
			projectController.updateProject(req,res, req.files);
		}
		else {
			projectController.updateProject(req,res);
		}
	});
app.post ('/projects/delete', projectController.deleteProject);
app.get ('/instituteProjects', projectController.getInstituteProjects);


//Admin
app.post ('/admin/createInstitute',  upload.fields([{name : 'logoUrl', maxCount : 1 } ,{name : 'aboutImageUrl', maxCount : 1 }]) ,

	function(req, res){
		if (req.files){
			adminController.createInstitute(req,res, req.files);
		}
		else {
			adminController.createInstitute(req,res);
		}
	});
app.post ('/admin/updateInstitute',   upload.fields([{name : 'logoUrl', maxCount : 1 } ,{name : 'aboutImageUrl', maxCount : 1 }]) ,

	function(req, res){
		if (req.files){
			adminController.updateInstitute(req,res, req.files);
		}
		else {
			adminController.updateInstitute(req,res);
	}
	});


app.post ('/admin/deleteInstitute',  adminController.deleteInstitute);
app.get ('/admin/institutes',  adminController.getInstitutes);
app.get ('/admin/users',  adminController.getUsers);
app.post ('/admin/createUser',  adminController.createUser);
app.post ('/admin/updateUser',  adminController.updateUser);
app.post ('/admin/deleteUser',  adminController.deleteUser);
app.get ('/admin/buildings',  adminController.getBuildings);


//Institute manager
app.get ('/institute', instituteManagerController.getIndex);
app.post ('/institute/createDepartment',  upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'largeImageUrl', maxCount : 1 }]) ,

	function(req, res){
		if (req.files){
			instituteManagerController.createDepartment(req,res, req.files);
		}
		else {
			instituteManagerController.createDepartment(req,res);
		}
	});

app.post ('/institute/updateDepartment',   upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'largeImageUrl', maxCount : 1 }]) ,

function(req, res){
	if (req.files){
	instituteManagerController.updateDepartment(req,res, req.files);
	}
	
	else {
		instituteManagerController.updateDepartment(req,res);
	}
});

app.post ('/institute/deleteDepartment',  instituteManagerController.deleteDepartment);
app.get ('/institute/departments',  instituteManagerController.getDepartments);
app.get ('/institute/projects',  instituteManagerController.getProjects);
app.get ('/institute/users',  instituteManagerController.getUsers);
app.post ('/institute/createUser',  instituteManagerController.createUser);
app.post ('/institute/updateUser',  instituteManagerController.updateUser);
app.post ('/institute/deleteUser',  instituteManagerController.deleteUser);
app.get ('/institute/department/:departmentId',  instituteManagerController.getDepartment);

//Locations
app.get ('/institute/locations',  instituteManagerController.getLocations);
app.post ('/institute/createLocation',  instituteManagerController.createLocation);
app.post ('/institute/updateLocation',  instituteManagerController.updateLocation);
app.post ('/institute/deleteLocation',  instituteManagerController.deleteLocation);

//Routes
app.get ('/institute/routes',  instituteManagerController.getRoutes);
app.post ('/institute/createRoute',  instituteManagerController.createRoute);
app.post ('/institute/updateRoute',  instituteManagerController.updateRoute);
app.post ('/institute/deleteRoute',  instituteManagerController.deleteRoute);

//Buildings
app.get ('/institute/buildings',  instituteManagerController.getBuildings);
app.post ('/institute/createBuilding',  instituteManagerController.createBuilding);
app.post ('/institute/updateBuilding',  instituteManagerController.updateBuilding);
app.post ('/institute/deleteBuilding',  instituteManagerController.deleteBuilding);



//Department manager
app.get ('/department', departmentManagerController.getIndex);
app.get ('/department/projects', departmentManagerController.getProjects);
app.get ('/department/locations', departmentManagerController.getLocations);
app.get ('/department/users', departmentManagerController.getUsers);
app.post ('/department/createProject', upload.fields([{name : 'imageUrl1', maxCount : 1 } ,  {name : 'imageUrl2', maxCount : 1 } , {name : 'imageUrl3', maxCount : 1 } ,{name : 'imageUrl4', maxCount : 1 } , {name : 'imageUrl5', maxCount : 1 } ,  {name : 'soundUrl', maxCount : 1 }]) ,

	function(req, res){
		if (req.files){
			departmentManagerController.createProject(req,res, req.files);
		}
		else {
		departmentManagerController.createProject(req,res);
		}
	});
	
app.post ('/department/updateProject',  upload.fields([{name : 'imageUrl1', maxCount : 1 },  {name : 'imageUrl2', maxCount : 1 } , {name : 'imageUrl3', maxCount : 1 } ,{name : 'imageUrl4', maxCount : 1 } , {name : 'imageUrl5', maxCount : 1 }  , {name : 'soundUrl', maxCount : 1 }]) , 

	function(req, res){
		if (req.files){
			departmentManagerController.updateProject(req,res, req.files);
		}
		else {
		departmentManagerController.updateProject(req,res);
		}
	}
);
app.post ('/department/deleteProject', departmentManagerController.deleteProject);
app.post ('/department/createUser',  departmentManagerController.createUser);
app.post ('/department/updateUser',  departmentManagerController.updateUser);
app.post ('/department/deleteUser',  departmentManagerController.deleteUser);


//Student
app.get ('/student/project', studentController.getProject);
app.post ('/student/updateProject',  upload.fields([{name : 'imageUrl1', maxCount : 1 } , {name : 'imageUrl2', maxCount : 1 } , {name : 'imageUrl3', maxCount : 1 } ,{name : 'imageUrl4', maxCount : 1 } , {name : 'imageUrl5', maxCount : 1 } , {name : 'soundUrl', maxCount : 1 }]) , 

	function(req, res){
		if (req.files){
			studentController.updateProject(req,res, req.files);
		}
		else {
			studentController.updateProject(req,res);
		}

	}
);


//Android App API
app.get ('/guest/institute/id/:instituteId', guestController.getInstituteById);
app.get ('/guest/location/id/:locationId', guestController.getLocationById);
app.get ('/guest/route/id/:routeId', guestController.getRouteById);
app.get ('/guest/department/id/:departmentId', guestController.getDepartmentById);
app.get ('/guest/project/id/:projectId', guestController.getProjectById);

app.get ('/guest/institute/id/:instituteId/departments', guestController.getInstituteDepartments);
app.get ('/guest/institute/id/:instituteId/projects', guestController.getInstituteProjects);
app.get ('/guest/department/id/:departmentId/projects', guestController.getDepartmentProjects);
app.get ('/guest/institute/:instituteId/department/:departmentId/projects', guestController.getInstituteProjects2);
//Routes
app.get ('/guest/institute/id/:instituteId/routes', guestController.getInstituteRoutes);


//Search
app.get ('/guest/institute/:instituteId/projects/:keyword', guestController.getProjectsBySearch);

//Home
app.get ('/', function (req,res) {
    res.send ("Welcome to Shenkar show app.please refer to the api for usage instructions.");
});
//Default route
app.all ('*', function (req,res) {
    res.send ("404: Page Not found.");
});

app.listen (port);
console.log ("service is listening on port " + port);
