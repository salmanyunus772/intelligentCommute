let mongoose = require('mongoose');
let planSchema =mongoose.Schema({
    routeId:{
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
    },
    planDays:{
        type:Array,
        "default" : [],
        require:true
    }
});


module.exports = mongoose.model('plans',planSchema);