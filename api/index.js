const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const User=require("./models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app=express();
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret="myPassword";

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
async function main() {
  
    await mongoose.connect( process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MONGODB!!");
  };
  
   
  
main().catch((err) => { console.log(err); })

app.get("/", (req,res)=>{
    res.send("My name is Kunal");
})

app.post("/signup", async (req,res)=>{
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        })
        res.send(userDoc);
    }catch(err){
        console.log(err);
        res.status(400).json(e);
    }
})


app.post("/login", async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        // User not found
        console.log('User not found');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
     const passOk = bcrypt.compareSync(password, userDoc?.password);
    if(passOk){
        res.json({username});
        console.log("Login Success");
    }
    else{
        return res.status(401).json({ error: 'Invalid credentials' });
        console.log("Login failed");
    }
});

app.listen(5000, (err)=>{
    if(err) console.log(err);
    console.log("app is running on port no 5000")
});



// YRpEew5aTw0ky2zX
// mongodb+srv://project1:YRpEew5aTw0ky2zX@cluster0.2htpck9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0