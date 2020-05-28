let mongoose = require('mongoose');

let dummy=mongoose.Schema({
    
    img:{
        type:String
    }
});


module.exports = mongoose.model('ImageUpload',dummy);
