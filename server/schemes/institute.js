var mongoose = require ('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);


var instituteSchema = new schema (


{

	_id : {type: Number, required:true, unique:true, autoIncrement:true},
    name: String,
    manager: {type: Number, ref: 'user'},
    logo: String,
    maps: String,
    routes : String


}, 

{collection: 'institutes'}

);


instituteSchema.plugin(autoIncrement.plugin, 'institute');
var institute = mongoose.model ('institute', instituteSchema);

module.exports = institute;


