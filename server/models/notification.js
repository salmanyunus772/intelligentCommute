let mongoose = require('mongoose');
let notificationSchema =mongoose.Schema({
    from:{
        type: String,
        required:true
    },
    to:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    },
    type:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    details:{
        type: String,
        required:true
    },
});
module.exports = mongoose.model('notifications',notificationSchema);