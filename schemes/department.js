var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var departmentSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true, autoIncrement:true},
    name: String,
    imageUrl : String, 
    largeImageUrl: String,
    locationDescription: String,
    location: {type: Number, ref: 'location'},
    path: String,
    building: {type: Number, ref: 'building'},
    institute: {type: Number, ref: 'institute'}
    
}, 

{collection: 'departments'}

);

departmentSchema.plugin(autoIncrement.plugin, 'department');

departmentSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 
var department = mongoose.model ('department', departmentSchema);

module.exports = department;


