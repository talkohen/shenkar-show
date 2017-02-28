var mongoose = require ('../database');
var project = require ('../schemes/project');

//return all projects in database
exports.getAllProjects = function (req, res) {

    project.find ({}).
    where('project').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}


//search project by id
exports.getProjectById  = function (req, res) {
    var id = req.params.projectId;
    console.log ('project ID = ' + id);

    project.find ({_id : id}).
    where('project').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}

//search project by name
exports.getProjectByName  = function (req, res) {
    var name = req.params.projectName;
    console.log ('project name = ' + name);

    project.find ({name : name}).
    where('project').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}
