let mongoose = require('mongoose');
let scheduleSchema =mongoose.Schema({
    driverId:{
        type: String,
        required:true
    },
    routeId:{
        type: String,
        required:true
    },
    busNumber:{
        type: String,
        required:true
    },
    startingDate:{
        type:Date,
        require:true
    },
    endingDate:{
        type:Date,
        require:true
    }
});
module.exports = mongoose.model('schedules',scheduleSchema);