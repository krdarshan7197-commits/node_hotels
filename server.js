const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

const Person = require('./models/person');
const menuItem = require('./models/menuItem');



// Import the router files
const personRoute = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoutes')



// Use the routers
app.use('/person',personRoute);
app.use('/menu', menuRoutes);





app.listen(PORT , ()=>{
    console.log("Server is running at 3000")
})