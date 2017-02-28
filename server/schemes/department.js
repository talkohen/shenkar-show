var mongoose = require ('mongoose');
var schema = mongoose.Schema;


var departmentSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true},
    name: String,
    manager: {type: Number, ref: 'user'},
    description: String,
    images: [String],



}, 

{collection: 'departments'}

);

var department = mongoose.model ('department', departmentSchema);

module.exports = department;


