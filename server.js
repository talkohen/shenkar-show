var express= require ('express');
var app = express();



//controllers
var userController = require ('./controllers/userController');
var instituteController = require ('./controllers/instituteController');
var departmentController = require ('./controllers/departmentController');
var projectController = require ('./controllers/projectController');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: true})); 

//schemes
var user = require ('./schemes/user');
var institute = require ('./schemes/institute');
var department = require ('./schemes/department');
var project = require ('./schemes/project');

var port = process.env.PORT || 3000;
app.set ('port',port);
app.use ('/' , express.static ('./public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  app.set ('json spaces', 4);
  res.set ("Content-Type", "application/json");
  next();
});

//users
app.get ('/allUsers', userController.getAllUsers);
app.get ('/users/id/:userId', userController.getUserById);
app.get ('/users/name/:userName', userController.getUserByName);
app.post ('/users/create', userController.createUser);
app.post ('/users/update', userController.updateUser);
app.post ('/users/delete', userController.deleteUser);

//institutes
app.get ('/allInstitutes', instituteController.getAllInstitutes);
app.get ('/institutes/id/:instituteId', instituteController.getInstituteById);
app.get ('/institutes/name/:instituteName', instituteController.getInstituteByName);
app.post ('/institutes/create', instituteController.createInstitute);
app.post ('/institutes/update', instituteController.updateInstitute);
app.post ('/institutes/delete', instituteController.deleteInstitute);

//departments
app.get ('/allDepartments', departmentController.getAllDepartments);
app.get ('/departments/id/:departmentId', departmentController.getDepartmentById);
app.get ('/departments/name/:departmentName', departmentController.getDepartmentByName);

//projects
app.get ('/allProjects', projectController.getAllProjects);
app.get ('/projects/id/:projectId', projectController.getProjectById);
app.get ('/projects/name/:projectName', projectController.getProjectByName);



app.all ('*', function (req,res) {
    res.send ("404: Page Not found.");
});

app.listen (port);
console.log ("service is listening on port " + port);
