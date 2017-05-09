var express= require ('express');
var app = express();
var AWS = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var mime = require('mime-types');
var credentials = require ('./credentials.js');
var cookieParser = require('cookie-parser');
var cors = require('cors');


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
 	
 	console.log ("ERRORRRRRRR: " + file.originalname);
  req.fileValidationError = 'goes wrong on the mimetype';
  return cb(null, false, new Error('goes wrong on the mimetype'));
 }
 console.log ("NOOOOOOO: " + file.originalname);
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

// var deleteImage = s3.deleteObjects({
    // Bucket: 'myprivatebucket/some/subfolders',
    // Delete: {
        // Objects: [
             // { Key: 'nameofthefile1.extension' }
        // ]
    // }
// }, function(err, data) {
// 
    // if (err)
        // return console.log(err);
// 
    // console.log('success');
// 
// });


//controllers
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

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true})); 

app.use(cors());
app.use(cookieParser());
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//schemes
var user = require ('./schemes/user');
var institute = require ('./schemes/institute');
var department = require ('./schemes/department');
var project = require ('./schemes/project');

var port = process.env.PORT || 3000;
app.set ('port',port);
app.use ('/' , express.static ('./public'));

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", ".talco.co");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  app.set ('json spaces', 4);
  res.set ("Content-Type", "application/json");
  next();
});


// app.use(function(req, res, next) {
    // if (req.cookies.shenkarShowSession != undefined ){
// // if user is not logged-in redirect back to login page //
        // res.writeHead(302, {Location: '/'});
	 		// res.end ();
// 	 		
    // }   else{
        // next();
    // }
// });
var ejs = require('ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


//users
app.get ('/allUsers', userController.getAllUsers);
app.get ('/users/id/:userId', userController.getUserById);
app.get ('/users/name/:userName', userController.getUserByName);
app.post ('/users/auth', userController.auth);
app.get ('/logout', authController.logout);
app.get ('/session', authController.getSession);
app.post ('/users/create', userController.createUser);
app.post ('/users/update', userController.updateUser);
app.post ('/users/delete', userController.deleteUser);

//institutes
app.get ('/allInstitutes', instituteController.getAllInstitutes);
app.get ('/institutes/id/:instituteId', instituteController.getInstituteById);
app.get ('/institutes/name/:instituteName', instituteController.getInstituteByName);
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

//departments
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

//projects
app.get ('/allProjects', projectController.getAllProjects);
app.get ('/projects/id/:projectId', projectController.getProjectById);
app.get ('/projects/name/:projectName', projectController.getProjectByName);
app.post ('/projects/create', upload.fields([{name : 'imageUrl', maxCount : 1 } , {name : 'soundUrl', maxCount : 1 }]) ,function(req, res){projectController.createProject(req,res, req.files);} );
app.post ('/projects/update', upload.fields([{name : 'imageUrl', maxCount : 1 } , {name : 'soundUrl', maxCount : 1 }]) ,
 function(req, res){

	if (req.files){
		
		
	projectController.updateProject(req,res, req.files);}
	else {
		
		projectController.updateProject(req,res);
	}
	});
app.post ('/projects/delete', projectController.deleteProject);

//admin
app.get ('/admin', adminController.getIndex);
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


//institute manager 
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
//locations
app.get ('/institute/locations',  instituteManagerController.getLocations);
app.post ('/institute/createLocation',  instituteManagerController.createLocation);
app.post ('/institute/updateLocation',  instituteManagerController.updateLocation);
app.post ('/institute/deleteLocation',  instituteManagerController.deleteLocation);
//routes
app.get ('/institute/routes',  instituteManagerController.getRoutes);
app.post ('/institute/createRoute',  instituteManagerController.createRoute);
app.post ('/institute/updateRoute',  instituteManagerController.updateRoute);
app.post ('/institute/deleteRoute',  instituteManagerController.deleteRoute);

//department manager
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


//student
app.get ('/student', studentController.getIndex);
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


//App API
app.get ('/guest/institute/id/:instituteId', guestController.getInstituteById);
app.get ('/guest/location/id/:locationId', guestController.getLocationById);
app.get ('/guest/route/id/:routeId', guestController.getRouteById);
app.get ('/guest/department/id/:departmentId', guestController.getDepartmentById);
app.get ('/guest/project/id/:projectId', guestController.getProjectById);


app.get ('/guest/institute/id/:instituteId/departments', guestController.getInstituteDepartments);
app.get ('/guest/institute/id/:instituteId/projects', guestController.getInstituteProjects);
app.get ('/guest/department/id/:departmentId/projects', guestController.getDepartmentProjects);
app.get ('/guest/institute/:instituteId/department/:departmentId/projects', guestController.getInstituteProjects2);
//routes
app.get ('/guest/institute/id/:instituteId/routes', guestController.getInstituteRoutes);

app.get ('/public/index', function(req, res) {res.render('index.html');} );
app.get ('/public/institute',function(req, res) {res.render('institute.html');});

app.get ('/', function (req,res) {
    res.send ("Welcome to Shenkar show app.please refer to the api for usage instructions.");
});

app.all ('*', function (req,res) {
    res.send ("404: Page Not found.");
});

app.listen (port);
console.log ("service is listening on port " + port);
