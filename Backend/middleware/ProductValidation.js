

const jwt = require("jsonwebtoken");

const ensureValidation =  (req,res,next) =>{
    const auth = req.headers["authorization"];
    console.log("Authorization header:", auth);
    if(!auth){
        console.log("No Authorization header found");
        return res.status(401).json({message:"unauthorized request!"});

    };

    const token = auth.split(" ")[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Token not provided in Authorization header!" });
    }

    try {
        console.log("Decoding the token...");
        const decoded = jwt.verify(token , process.env.SECRETE_KEY);
        console.log("SECRET_KEY:", process.env.SECRETE_KEY);

        console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(400).json({message:"unauthorized access to the resources!"})
    };
   
    

}  


module.exports = {ensureValidation};