const express=require('express');
const bodyParser=require('body-parser');
const {mongoose}=require('./db.js');
const employeeController=require("./controllers/employeeController");
const router = require('./controllers/employeeController');
const cors=require('cors');
var app=express();
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:4200"}));
app.listen(3131,()=>{
    console.log('server is started at port number: 3131');
    
});
app.use('/employee',router);