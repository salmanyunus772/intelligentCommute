const mongoose = require('mongoose');
const stopSchema =mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    name:{
        type: String,
        required:true
    }
});


module.exports = mongoose.model('stops',stopSchema);