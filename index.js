const express = require("express");
const cors= require("cors");
const { default: axios } = require("axios");
require("dotenv");
const { Connection } = require("./config/db");
const { UserModel } = require("./models/userModel");
const PORT= process.env.PORT;
const app= express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to Backend!!");
});

app.post("/fetchUsers",async(req,res)=>{
    try{
        let data= await axios.get("https://randomuser.me/api/?results=50")
       let result= data.data.results;
       let users= await UserModel.insertMany(result);
    //    users.save();
    // console.log(users)
        res.status(200).send("Data added Succeess")
    }
    catch(err){
        res.send({message:err.message})
    }
})

app.get("/userDetails",async(req,res)=>{
    const {page,limit,filter}=req.query;
    console.log(page,limit,filter);
    try{
        if(filter !==""){
            const total=await UserModel.find({gender:filter}).count();
            const data=await UserModel.find({gender:filter}).skip((page-1)*limit).limit(limit);
            const totalPage= (total/limit) 
            console.log(totalPage,"pages")
            res.send({data:data,totalPages:totalPage});
        }
        else{
            //70 
            const total=await UserModel.find().count(); 
            const data=await UserModel.find({}).skip((page-1)*limit).limit(limit);
            const totalPage= (total/limit) 
           console.log(totalPage,"pages")

            res.send({data:data,totalPages:totalPage});
        } 
    }
    catch(err){
          res.send(err.message)
    }
})

app.delete("/deleteUsers",async(req,res)=>{
    try{
   let deleted= await UserModel.deleteMany({});
   res.status(200).send({message:"Data Deleted Successfully!!"})
    }
    catch(err){

    }
})


app.listen(PORT, async () => {
    try {
      await Connection;
      console.log("connected to db successfully");
    } catch (err) {
      console.log("Error:connecting error");
      console.log(err);
    }
  
    console.log(`Server is started at http://localhost:${PORT}`);
  });