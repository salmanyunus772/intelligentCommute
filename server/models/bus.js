let mongoose = require('mongoose');
let busSchema =mongoose.Schema({
    busNumber:{
        type: String,
        required:true
    },
    noOfSeats:{
        type: Number,
        required:true
    },
    occupiedSeats:{
        type: Number
    },
    scheduleId:{
        type:Number
    },
    location:{
        type: Array,
        // required:true
    }
});
module.exports = mongoose.model('buses',busSchema);