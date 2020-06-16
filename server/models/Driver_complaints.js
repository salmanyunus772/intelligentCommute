let mongoose = require('mongoose');
let drivercomplaintSchema =mongoose.Schema({
    from:{
        type: String
    },
    date:{
        type: Date
    },
    description:{
        type: String,
        required:true
    },
    AdminResponse:{
        type: String
    }
});
module.exports = mongoose.model('DriverComplaint',drivercomplaintSchema);
