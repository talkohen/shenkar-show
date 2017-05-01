var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var routeSchema = new schema (


{

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    institute : {type: Number, ref: 'institute'}, 
    projectIds: [{type: Number, ref: 'project'}]

}, 

{collection: 'routes'}

);


routeSchema.plugin(autoIncrement.plugin, 'route');
routeSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var route = mongoose.model ('route', routeSchema);

module.exports = route;
