require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const controller = require('./controllers/Controller');
const Mongo_Url = process.env.Mongo_Url;
const cors=require("cors");
const path=require("path")

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => {
  res.json({ message: 'Server is running!', status: 'OK' });
});



mongoose.connect(Mongo_Url)
.then(()=>{
    console.log("MongoDB is connected");
}).catch((err)=>{   
  console.log("MongoDB is not connected", err);
})


app.use('/', controller);
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  
});



