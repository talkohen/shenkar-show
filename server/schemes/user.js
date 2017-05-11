var mongoose = require ('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);



var userSchema = new schema (

{

    _id : {type: Number, required:true, index:1, unique:true, autoIncrement:true},
    role:  {type: String, ref: 'role'},
    userName: String,
    name: String,
    password: String,
    email: String,
    department: {type: Number, ref: 'department'},
    institute: {type: Number, ref: 'institute'},
    project: {type: Number, ref : 'project'}

}, 

{collection: 'users'}

);

userSchema.plugin(autoIncrement.plugin, 'user');

userSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
}); 
var user = mongoose.model ('user', userSchema);

module.exports = user;


