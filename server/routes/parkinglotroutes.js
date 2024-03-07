const express = require('express');
const router = express.Router();
const ParkingLot = require('../models/parkinglot');


router.post('/', async (req, res) => {
    try {
        const { capacity } = req.body;

        
        if (!capacity) {
            return res.status(400).json({ isSuccess: false, error: 'Capacity is required' });
        }

        if (capacity < 0 || capacity > 2000) {
            return res.status(400).json({ isSuccess: false, error: 'Capacity should be between 0 and 2000' });
        }

        const parkingLot = await ParkingLot.create({ capacity });

       
        const response = {
            id: parkingLot._id, 
            capacity: parkingLot.capacity,
            isActive: true 
        };

        // Return the response
        res.status(201).json({ isSuccess: true, response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ isSuccess: false, error: 'Internal Server Error' });
    }
});

module.exports = router;