
const mongoose=require('mongoose');
const Joi =require("joi");
 
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userImageUrl:{
        type: String,
        required:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});
 
const User=mongoose.model('users',userSchema);

// const validate=(users)=>{
//     const schema=Joi.object({
//         firstName:Joi.string().required(),
//         lastName:Joi.string().required(),
//         email:Joi.string().email().required(),
//         password:Joi.string().required()
//     })
//     return schema.validate(users)
// }
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
      //expiresIn: 5,
    });
  };
 
module.exports={User};