var mongoose = require ('mongoose');
var schema = mongoose.Schema;


var projectSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true},
    name: String,
    department: {type: Number, ref: 'department'},
    students: [{type: Number, ref: 'user'}],
    description: String,
    image: String,
    video: String,
    audio: String,
    location: String,
    likes: String,
    comments: String,
    QRcode: String

}, 

{collection: 'projects'}

);

var project = mongoose.model ('project',projectSchema);

module.exports = project;


