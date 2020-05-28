let mongoose = require('mongoose');
let newsSchema =mongoose.Schema({
    date:{
        type: Date
    },
    news:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('AdminNews',newsSchema);
