let mongoose = require('mongoose');
let driverSchema =mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    cell:{
        type: Number,
        required:true
    },pass:{
        type: String,
        required:true
    },rfid:{
        type: String,
        required:false
    }
});
module.exports = mongoose.model('driver',driverSchema);