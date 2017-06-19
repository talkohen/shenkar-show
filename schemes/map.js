var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var mapSchema = new schema (


{
	_id : {type: Number, required:true, unique:true, autoIncrement:true},
	institute: {type: Number, ref: 'institute'},
    imageUrl: String
}, 

{collection: 'maps'}

);


mapSchema.plugin(autoIncrement.plugin, 'map');

mapSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 
var map = mongoose.model ('map', mapSchema);

module.exports = map;


