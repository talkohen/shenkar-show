var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var projectSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true, autoIncrement:true},
    name: String,
    institute: {type: Number, ref: 'institute'},
    department: {type: Number, ref: 'department'},
    description: String,
    image: String,
    video: String,
    audio: String,
    location: {type: Number, ref: 'location'},
    likes: Number,
    comments: [String],
    QRcode: String

}, 

{collection: 'projects'}

);

projectSchema.plugin(autoIncrement.plugin, 'project');
var project = mongoose.model ('project',projectSchema);

module.exports = project;


