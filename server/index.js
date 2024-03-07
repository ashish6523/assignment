const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const parkingLotRoutes = require('./routes/parkinglotroutes'); 
const parkingRoutes = require('./routes/parkingroutes'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const db=require("./db");
db.connect();

app.use(express.json());

// Routes
app.use('/api/parkingLots', parkingLotRoutes); 
app.use('/api/parkings', parkingRoutes); 

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

