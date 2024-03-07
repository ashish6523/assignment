const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true,
        min: 0,
        max: 2000
    }
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);