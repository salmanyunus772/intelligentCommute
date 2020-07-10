
    
let mongoose = require('mongoose');
let lostfoundresponseSchema =mongoose.Schema({
id:{
type:String
    },
responseFrom:{
type:String
    },
responseDate:{
type:Date,
default:Date.now
    },
responderPhoneNumber:{
type:String
    },
reply:{
type:String
    },
img:{
type:String
    }
});
module.exports = mongoose.model('LostFoundResponse',lostfoundresponseSchema);

