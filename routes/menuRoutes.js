const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');
const { route } = require('./personRoute');

//POST method to add a menu
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  } 
  catch (error) {
    // if (error.code === 11000) {
    //   // duplicate key error
    //   return res.status(409).json({
    //     error: 'A person with this email already exists',
    //     field: Object.keys(error.keyValue)[0],
    //   });
    // }
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get method to get the menu items
router.get('/', async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//  --Task ---- use  parameters

// router.get('/:taste', async (req, res) => {
//   try {
   
//   } catch (error) {
    
//   }
// });

// comment added for purpose of testting
module.exports = router;