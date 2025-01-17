const joi = require("joi");


// define validation Schema


const signupValidation = (req,res,next) => {
    const Schema =  joi.object({
     name:joi.string().min(3).max(20).required(),
     email:joi.string().email().required(),
     password:joi.string().min(3).max(30).required()

})
     const {error} = Schema.validate(req.body)

     if (error) {
        res.status(400).
        json({message:"bad request",error})
     }

     next();
}


const loginValidation = (req,res,next) => {
    const Schema =  joi.object({
     
     email:joi.string().email().required(),
     password:joi.string().min(3).max(30).required()

})
     const {error} = Schema.validate(req.body)

     if (error) {
       return res.status(400).
       json({message:"bad request" , error})
     }

     next();
}


module.exports = {
     signupValidation,
     loginValidation

}