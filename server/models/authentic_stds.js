let mongoose = require('mongoose');

let authentic_stdsSchema =mongoose.Schema({
    busId:{
        type: String,
    },
    rfid_count:{
        type: Number,
    },
    camera_count:{
        type: Number,
    },
    Date:{
        type:String, 
    },
});

module.exports = mongoose.model('Authentic_Students',authentic_stdsSchema);
