var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var buildingSchema = new schema (


{

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    location: {type: Number, ref: 'location'},
    locationDescription: String,
    zoom: Number,
    institute: {type: Number, ref: 'institute'},
    department: {type: Number, ref: 'department'}

}, 

{collection: 'buildings'}

);


buildingSchema.plugin(autoIncrement.plugin, 'building');

buildingSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var building = mongoose.model ('building', buildingSchema);

module.exports = building;
