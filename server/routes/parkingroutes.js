const express = require('express');
const router = express.Router();
const Parking = require('../models/parking');

// Park Car
router.post('/', async (req, res) => {
    try {
        const { parkingLotId, registrationNumber, color } = req.body;

        // Check if all required fields are provided
        if (!parkingLotId || !registrationNumber || !color) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        
        const slotNumber = 1; 
        const status = 'PARKED';

        
        const parking = await Parking.create({
            parkingLotId,
            registrationNumber,
            color,
            slotNumber,
            status
        });

        res.json({
            isSuccess: true,
            response: {
                slotNumber: parking.slotNumber,
                status: parking.status
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/', async (req, res) => {
    try {
        const { parkingLotId, registrationNumber } = req.body;

        
        if (!parkingLotId || !registrationNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        

        res.json({ message: 'Car left successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Registration Number by Color
router.get('/', async (req, res) => {
    try {
        const { color, parkingLotId } = req.query;

        if (!color) {
            return res.status(400).json({ error: 'Color parameter is required' });
        }

       
        if (!parkingLotId) {
            return res.status(400).json({ error: 'Parking lot ID is required' });
        }

        
        const registrations = await Parking.find({ color, parkingLotId });

        if (!registrations.length) {
            return res.json({ isSuccess: false, error: { reason: `No car found with color ${color}` } });
        }

       
        const response = {
            registrations: registrations.map(registration => ({
                color: registration.color,
                registrationNumber: registration.registrationNumber
            }))
        };

        res.json({ isSuccess: true, response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Slot Numbers for Color
router.get('/Slots', async (req, res) => {
    try {
        const { color, parkingLotId } = req.query;

        // Check if color and parkingLotId parameters are provided
        if (!color || !parkingLotId) {
            return res.status(400).json({ error: 'Color and parkingLotId parameters are required' });
        }

        // Find slots based on color and parkingLotId
        const slots = await Parking.find({ color, parkingLotId }).sort({ createdAt: 1 });

        // If no slots found for the specified color
        if (!slots.length) {
            return res.json({ isSuccess: false, error: { reason: `No car found with color ${color}` } });
        }

        // Response with slots
        const response = {
            slots: slots.map(slot => ({
                color: slot.color,
                slotNumber: slot.slotNumber
            }))
        };

        res.json({ isSuccess: true, response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;