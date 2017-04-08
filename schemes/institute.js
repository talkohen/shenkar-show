var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var instituteSchema = new schema (


{
	

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    logo: String,
    image: String,
    description: String, 
    
    //Style
    primaryColor: {type: String, default: "#ffffff"},
    secondaryColor: {type: String, default: "#000000"},
    lineColor: {type: String, default: "#ffffff"},
    mainTextColor: {type: String, default: "#000000"}


}, 

{collection: 'institutes'}

);


instituteSchema.plugin(autoIncrement.plugin, 'institute');
var institute = mongoose.model ('institute', instituteSchema);

module.exports = institute;


