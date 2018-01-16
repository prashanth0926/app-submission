/**
 * Module dependencies.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
/**
 * Category Schema
 */
var Applicant=new Schema({
	firstname: String ,
      lastname: String,
      email: {type: String, unique:true},
      zipcode:String,
      code:String,
      status:String, // status ( Not submitted , Pending , Accepted, Rejected
});


// Expose the model to other objects
module.exports=mongoose.model('Applicant',Applicant);