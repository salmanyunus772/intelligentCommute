let mongoose = require('mongoose');
let studentSchema =mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    pass:{
        type: String,
        required:true
    },
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    reg:{
        type: String,
        required:true
    },
    stop:{
        type: String,
        required:true
    },
    busNumber:{
        type: String,
        required:false
    },
    rfid:{
        type: String,
        required:false
    },
    serviceExpiresOn:{
        type: Date,
        required:false
    },
    id:{
        type:Number
    },
    EmergencyContact:{
        type:Number,
        required:true
    },
    Confirm:{
        type:Boolean
    }
});
module.exports = mongoose.model('students',studentSchema);