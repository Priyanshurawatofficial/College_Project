require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const controller = require('./controllers/Controller');
const Mongo_Url = process.env.Mongo_Url;
const cors=require("cors");
app.use(cors());

app.use(express.json());

mongoose.connect(Mongo_Url)
.then(()=>{
    console.log("MongoDB is connected");
}).catch((err)=>{   
  console.log("MongoDB is not connected", err);
})




app.use('/', controller);
app.listen(3000, () => {
  console.log("Server is started on port 3000");
});



