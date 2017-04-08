var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var locationSchema = new schema (


{

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    description: String,
    lat: Number,
    lng: Number,
    url: String,

}, 

{collection: 'locations'}

);


locationSchema.plugin(autoIncrement.plugin, 'location');
var location = mongoose.model ('location', locationSchema);

module.exports = location;
