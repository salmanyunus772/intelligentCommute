let mongoose = require('mongoose');
let complaintSchema =mongoose.Schema({
    from:{
        type: String
    },
    date:{
        type: Date
    },
    type:{
        type: String
    },
    description:{
        type: String,
        required:true
    },
    AdminResponse:{
        type:String
    }
});
module.exports = mongoose.model('Complaint',complaintSchema);
