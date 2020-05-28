let mongoose = require('mongoose');

let attendanceSchema =mongoose.Schema({
    busId:{
        type: String
    },
    rfid:{
        type: String,
        
    },
    date:{
        type:String,
       
    },
});

module.exports = mongoose.model('Attendances',attendanceSchema);
