const express=require("express");
const router=express.Router( );
var objId=require('mongoose').Types.ObjectId;
var {Employee}=require("../models/employee");
const employee = require("../models/employee");

//=>localhost:3000/employees
router.get('/',(req,res)=>{
    Employee.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log("Error in retriving Employees: ",JSON.stringify(err,undefined,2));
            
        }
    }
    );
 
});
router.get("/:id",(req,res)=>
{
  if(!objId.isValid(req.params.id)){
      return res.status(400).send(`no record woth given Id : ${req.params.id}`);
    
  }
  Employee.findById(req.params.id,{name:1},(err,doc)=>{
      if(!err){
          res.send(doc);
      }
      else{
          console.log("error in retriving Employee: "+JSON.stringify(err,undefined,2));
          
      }
  })
})
router.post('/',(req,res)=>{
var emp=new Employee({
name:req.body.name,
position:req.body.position,
office:req.body.office,
salary:req.body.salary
});
emp.save((err,doc)=>
{
    if(!err){
res.send(doc)
    }
    else{
console.log("Data not saved :" +JSON.stringify(err,undefined,2));

    }
})
});


router.put('/:id',(req,res)=>{
    if(!objId.isValid(req.params.id))
    return res.status(400).send(`No recode found with id :${req.params.id}`);
 
 var emp={
     name:req.body.name,
     position:req.body.position,
     office:req.body.office,
     salary:req.body.salary
 }
 
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new :true},(err,doc)=>{
        if(!err){
            res.send(doc)
                }
                else{
            console.log("Data not updated :" +JSON.stringify(err,undefined,2));
            
                }

    });
});
router.delete("/:id",(req,res)=>{
    if(!objId.isValid(req.params.id))
    return res.status(400).send(`No recode found with id :${req.params.id}`);
 Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){
        res.send(doc)
            }
            else{
        console.log("Data not deleted :" +JSON.stringify(err,undefined,2));
        
            }
 });
});
module.exports=router;