let mongoose = require('mongoose');
let lostfoundSchema =mongoose.Schema({
    from:{
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
    description:{
        type: String,
        required:true
    },
    img:{
        type:String
    },
    responses:{
        type:Array
    }
});
module.exports = mongoose.model('LostFound',lostfoundSchema);
