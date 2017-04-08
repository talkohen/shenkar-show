var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var instituteSchema = new schema (


{
	
	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    logoUrl: String,
    primaryColor: {type: String, default: "#ffffff"},
    secondaryColor: {type: String, default: "#000000"},
    lineColor: {type: String, default: "#ffffff"},
    mainTextColor: {type: String, default: "#000000"},
    aboutText: String, 
    aboutImageUrl: String
    

}, 

{collection: 'institutes'}

);


instituteSchema.plugin(autoIncrement.plugin, 'institute');

instituteSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 
var institute = mongoose.model ('institute', instituteSchema);

module.exports = institute;


