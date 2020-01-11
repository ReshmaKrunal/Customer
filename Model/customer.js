const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const moment = require('moment');
const bcrypt  = require('bcrypt');
var JWT = require('jsonwebtoken');

var customerSchema = new Schema(
    {
      ID: {
          type : Number,
          unique : true,
          required : true,
          default: parseInt(moment(new Date()).format('mmssSSS'))
      },
      FirstName :{
          type : String,
          required : true
      },
      LastName : {
          type: String,
          required : true
      },
      Email:{
          type:String,
          unique:true,
          required : true
      },
      Password:{
        type:String,
        required : true
    },
      Phone : {
          type:String,
          required:true
      },

      Address : {
          type :String,
          required : true
      },
      Update_timestamp:{
          type : Date,
          default : Date.now()
      }
    }
)
customerSchema.methods.GenerateJWTToken = function(callback){

    bcrypt.hash(this.Password,10,(err, hassed_pass )=>{
     this.Password = hassed_pass
     this.save()
     .then(result=>{
         callback({status :'Success',
        Token : JWT.sign({email : this.email , password : this.password},"resjshd")
         });
     })
     .catch(err=>{
        callback({Status:'error',ErrorDetails:err});
     
     });
    })
}

customerSchema.statics.verifyJWTToken = function(token){
    var decoded ;
    try{
        decoded = JWT.verify(token,'resjshd');
        return Promise.resolve(decoded);
    }
    catch(error){
        return Promise.reject(error);
    }
}

var Customer =  Mongoose.model("customer",customerSchema) ;
module.exports = Customer;