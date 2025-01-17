const router = require("express").Router();
const {ensureValidation } = require("../middleware/ProductValidation") 


router.get("/", ensureValidation , (req,res)=>{
    console.log("----- logged in user details ------" , req.user);
    return   res.status(200).json([{
        "id": 1,
        "name":"mobile",
        "price":1000
    },{
        "id": 2,
        "name":"laptop",
        "price":2000
    },])
})





 module.exports =  router ;