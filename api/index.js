const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const User=require("./models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const {v4:uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
const fs = require('fs');
const Post = require("./models/Post");
const app=express();
require('dotenv').config();

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const salt = bcrypt.genSaltSync(10);
const secret="myPassword";

app.use(cors({

    origin: true,
    methods: ["GET", "POST"],
    credentials: true
}));




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
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const random = uuidv4();
      cb(null, random + "-" + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/profile', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const filepath = await cloudinary.uploader.upload(req.file.path);
      console.log("Cloudinary response:", filepath);
  
      // Save to MongoDB or perform other operations with the uploaded file
      const newPost = new Post({ image: filepath.secure_url });
      await newPost.save();
      console.log("Image URL saved to MongoDB");
  
      // Delete the uploaded file from the server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
  
      res.send("File uploaded successfully");
    } catch (err) {
      console.error("Error handling file upload:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

  app.get('/image', async (req, res) => {
    try {
      // Fetch image URL from MongoDB
      const image = await Post.findOne(); // Adjust this according to your schema
      res.json({ image: image.image }); // Assuming you have 'url' field in your schema
    } catch (err) {
      console.error('Error fetching image URL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(5000, (err)=>{
    if(err) console.log(err);
    console.log("app is running on port no 5000")
});



module.exports = app;