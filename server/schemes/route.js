var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var routeSchema = new schema (


{

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    projectIds: [{type: Number, ref: 'project'}]

}, 

{collection: 'routes'}

);


routeSchema.plugin(autoIncrement.plugin, 'route');
var route = mongoose.model ('route', routeSchema);

module.exports = route;
