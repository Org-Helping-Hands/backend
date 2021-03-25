import express from 'express'
var app = express()
import userRoutes from "./routes/userRoutes";
import cors from "cors";
var bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(cors())
app.get("/",(_,res)=>{
    res.send("<h4>Wrong</h4>")
})

app.use("/user",userRoutes);
app.listen(3000,()=>{
    console.log("Server running");
})