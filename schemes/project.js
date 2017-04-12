var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var projectSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true, autoIncrement:true},
    departmentId: {type: Number, ref: 'department'},
    name: String,
    description: String,
    imageUrl: String,
    videoUrl: String,
    soundUrl: String,
    location: {type: Number, ref: 'location'},
	institute: {type: Number, ref: 'institute'},
	students: {type: Number, ref: 'student'},
}, 

{collection: 'projects'}

);

projectSchema.plugin(autoIncrement.plugin, 'project');
projectSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 
var project = mongoose.model ('project',projectSchema);

module.exports = project;


