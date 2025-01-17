require("dotenv").config();
const express = require("express");
const app = express();
require ("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const productRouter = require("./routes/productRouter")





const PORT = process.env.PORT || 8080;

app.get("/ping" , (req,res)=>{
    res.send("PONG");
})
 


app.use(bodyParser.json());

app.use(cors());

app.use("/auth", AuthRouter );

app.use("/products" , productRouter);

app.listen(PORT , () => {
   console.log(`server is running on ${PORT}`) });