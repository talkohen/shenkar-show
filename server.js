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


//schemes
var user = require ('./schemes/user');
var institute = require ('./schemes/institute');
var department = require ('./schemes/department');
var project = require ('./schemes/project');

var port = process.env.PORT || 3000;
app.set ('port',port);
app.use ('/' , express.static ('./public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://talco.co");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  app.set ('json spaces', 4);
  res.set ("Content-Type", "application/json");
  next();
});

app.use(function(req, res, next) {
    if (req.cookies.shenkarShowSession != undefined ){
// if user is not logged-in redirect back to login page //
        res.redirect('http://talco.co/shenkar-show/login');
    }   else{
        next();
    }
});




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
		
		instituteController.updateDepartment(req,res);
	}
	
	});
app.post ('/departments/delete', departmentController.deleteDepartment);

//projects
app.get ('/allProjects', projectController.getAllProjects);
app.get ('/projects/id/:projectId', projectController.getProjectById);
app.get ('/projects/name/:projectName', projectController.getProjectByName);
app.post ('/projects/create', upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'videoUrl', maxCount : 1 }, {name : 'soundUrl', maxCount : 1 }]) ,function(req, res){projectController.createProject(req,res, req.files);} );
app.post ('/projects/update', upload.fields([{name : 'imageUrl', maxCount : 1 } ,{name : 'videoUrl', maxCount : 1 }, {name : 'soundUrl', maxCount : 1 }]) ,
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

//institute manager 
app.get ('/institute', instituteManagerController.getIndex);
app.post ('/institute/createDepartment', upload.fields([{name : 'logo', maxCount : 1 } ,{name : 'images', maxCount : 5 }]) ,function(req, res){instituteManagerController.createDepartment(req,res, req.files);});
app.post ('/institute/updateDepartment',  instituteManagerController.updateDepartment);
app.post ('/institute/deleteDepartment',  instituteManagerController.deleteDepartment);
app.get ('/institute/departments',  instituteManagerController.getDepartments);
app.get ('/institute/users',  instituteManagerController.getUsers);
app.post ('/institute/createUser',  instituteManagerController.createUser);
app.post ('/institute/updateUser',  instituteManagerController.updateUser);
app.post ('/institute/deleteUser',  instituteManagerController.deleteUser);

//department manager
app.get ('/department', departmentManagerController.getIndex);
app.get ('/department/projects', departmentManagerController.getProjects);
app.get ('/department/users', departmentManagerController.getUsers);
app.post ('/department/createProject', departmentManagerController.createProject);
app.post ('/department/updateProject', departmentManagerController.updateProject);
app.post ('/department/deleteProject', departmentManagerController.deleteProject);
app.post ('/department/createUser',  departmentManagerController.createUser);
app.post ('/department/updateUser',  departmentManagerController.updateUser);
app.post ('/department/deleteUser',  departmentManagerController.deleteUser);


//student
app.get ('/student', studentController.getIndex);
app.get ('/student/project', studentController.getProject);
app.get ('/student/updateProject', studentController.updateProject);


//App API
app.get ('/guest/institute/id/:instituteId', guestController.getInstituteById);
app.get ('/guest/location/id/:locationId', guestController.getLocationById);
app.get ('/guest/route/id/:routeId', guestController.getRouteById);
app.get ('/guest/department/id/:departmentId', guestController.getDepartmentById);
app.get ('/guest/project/id/:projectId', guestController.getProjectById);

app.get ('/guest/institute/id/:instituteId/departments', guestController.getInstituteDepartments);
app.get ('/guest/institute/id/:instituteId/projects', guestController.getInstituteProjects);
app.get ('/guest/department/id/:departmentId/projects', guestController.getDepartmentProjects);


app.get ('/', function (req,res) {
    res.send ("Welcome to Shenkar show app.please refer to the api for usage instructions.");
});

app.all ('*', function (req,res) {
    res.send ("404: Page Not found.");
});

app.listen (port);
console.log ("service is listening on port " + port);
