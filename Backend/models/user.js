const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:
    {type:String,
     required:true,
     trim:true,

    },
   email:
    {type:String,
     required:true,
     unique:true,
     lowerCase:true,

    },
    password:
    {type:String,
    required:true,
    trim:true,
    minlength:3,

    }
})


const UserModel = mongoose.model("user" , userSchema) ;
module.exports = UserModel;