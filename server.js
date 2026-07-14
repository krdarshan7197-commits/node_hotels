const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Person = require('./models/person');
const menuItem = require('./models/menuItem');



// Import the router files
const personRoute = require('./routes/personRoute');
const menuRoutes = require('./routes/menuRoutes')



// Use the routers
app.use('/person',personRoute);
app.use('/menu', menuRoutes);




app.listen(3000 , ()=>{
    console.log("Server is running at 3000")
})