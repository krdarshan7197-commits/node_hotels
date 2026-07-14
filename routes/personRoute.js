const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//POST method to add a person information
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key error
      return res.status(409).json({
        error: 'A person with this email already exists',
        field: Object.keys(error.keyValue)[0],
      });
    }
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a person
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//  -------------------------------------------------------------------------------------------------------------------

// using parameter to find persons
router.get('/:work', async(req, res)=>{
     try {
      const workType = req.params.workType; // Extract the work tyoe from the URL parameter

       if(workType =="chef" || workType =='waiter' || workType =='manager'){
        
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error:'invalid work type'})
      }
     } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal server error' });
     }
})

// if block is not working to be fixed later
//  ----------------------------------------------------------------------------------------------------------- 

//PUT method
router.put('/:id',async(req, res)=>{
    try {
        const personId = req.params.id; // Extract the id from URL Parameter
        const updatedPersonData = req.body; // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, // Return the updated document 
            runValidators: true, // Run the mongoose validation
        })

        if(!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log('data updated')
        res.status(200).json(response)
    } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'Internal server error' });
    }
})


//DELETE Method
router.delete('/:id', async(req, res)=>{
    try {
         const personId = req.params.id; // Extract the id from URL Parameter

         //Assuming you have a person model
         const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not found'});
        }

         console.log('data delete')
        res.status(200).json({message: 'person deleted successfully'})

    } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'Internal server error' });
    }
    
})


module.exports = router;