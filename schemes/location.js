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
    institute: {type: Number, ref: 'institute'}

}, 

{collection: 'locations'}

);


locationSchema.plugin(autoIncrement.plugin, 'location');

locationSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 

var location = mongoose.model ('location', locationSchema);

module.exports = location;
