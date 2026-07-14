const mongoose = require('mongoose');

// Define the MongoDB connection to URL 
// const mongoURL ='mongodb://127.0.0.1:27017/myDatabase';

// const uri = 'mongodb://127.0.0.1:27017/hotel';

//Mongodb Atlas connection
const mongoURL =  'mongodb+srv://krdarshan7197_db_user:Golu@1109@cluster0.rmbogy8.mongodb.net/'


// console.log(JSON.stringify(uri));
// console.log(uri.length); // should be exactly 39


//setup mongoDB connection 
mongoose.connect('mongodb://127.0.0.1:27017/hotel');





// get the default connection 
//Mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

//Define the event listeners for database connection

db.on('connected', ()=>{
    console.log("Connected to MongoDB ")
});

db.on('error', (err)=>{
    console.log("MongoDB Connection error ", err)
});

db.on('disconnected', ()=>{
    console.log("Disconnected to MongoDB ")
});

//Export the Database connection
module.exports = db;