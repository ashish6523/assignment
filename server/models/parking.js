const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    parkingLotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    registrationNumber: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    slotNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PARKED', 'LEFT'],
        default: 'PARKED'
    }
});

module.exports = mongoose.model('Parking', parkingSchema);