const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

//DotEnv to store config variables
require('dotenv').config();


const mainApp= express();
const port = process.env.PORT || 5000;

//Applying midleware
mainApp.use(cors()); //cross origin resource sharing middleware
mainApp.use(express.json()); //json middleware to parse incoming requests with json payloads

mongoose.connect(process.env.ATLASURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Connection with Mongo has been stablished succesfully");
})
const userRoutes = require('./routes/User.routes');
mainApp.use('/User', userRoutes);

mainApp.listen(port, () =>{
    console.log(`express server is running in ${port}!`);
})