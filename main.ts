import express from 'express'
var app = express()
var user = require('./User/index')
var cors = require('cors')
var bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(cors())
app.get("/",(_,res)=>{
    res.send("<h4>Wrong</h4>")
})

app.use("/user",user);
app.listen(3000,()=>{
    console.log("Server running");
})