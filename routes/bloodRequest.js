// routes/bloodRequest.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// router.get('/', async ( req, res) => {
//     try{
//         res.send("This is working!!!! wow");
//     }catch (error){
//         res.status(404).json({error: "error"})
//     }  
// })
// POST route to handle blood requests
router.post('/', async (req, res) => {
    try {
        const { name, emergency, location, age, gender, bloodGroup } = req.body;

        // Validate that all fields are provided
        if (!name || !emergency || !location || !age || !gender || !bloodGroup) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create a new patient record
        const newPatient = new Patient({ name, emergency, location, age, gender, bloodGroup });
        await newPatient.save();

        res.status(201).json({ message: 'Blood request submitted successfully.' });
    } catch (error) {
        console.error('Error submitting blood request:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

router.get('/',async (req,res) => {
    try {
        const patients = await Patient.find({});
        return res.status(200).json({
            patients
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
    
});

// router.put('/update/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         if (!['accepted', 'rejected'].includes(status)) {
//             return res.status(400).json({ error: 'Invalid status. Must be either accepted or rejected.' });
//         }

//         const updatedPatient = await Patient.findByIdAndUpdate(id, { status }, { new: true });

//         if (!updatedPatient) {
//             return res.status(404).json({ error: 'Patient not found.' });
//         }

//         res.status(200).json({ message: `Blood request status updated to ${status}.`, updatedPatient });
//     } catch (error) {
//         console.error('Error updating blood request status:', error);
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// });

module.exports = router;
