var mongoose = require ('../database');
var department = require ('../schemes/department');


exports.getAllDepartments = function (req, res) {

    department.find ({}).
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}


exports.getDepartmentById  = function (req, res) {
    var id = req.params.departmentId;
    console.log ('Dep ID = ' + id);

    department.find ({_id : id}).
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}

exports.getDepartmentByName  = function (req, res) {
    var name = req.params.departmentName;
    console.log ('department name = ' + department);

    department.find ({name : name}).
    where('department').ne ('PRIVATE').
    exec (function (err, docs) {
        Data = docs;
        console.log ('docs: ' + docs);
        res.json (docs);
        return;
    });
}
