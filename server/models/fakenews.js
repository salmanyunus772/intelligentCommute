let mongoose = require('mongoose');
let FakenewsSchema =mongoose.Schema({
    date:{
        type: String
    },
    news:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('FakeNews',FakenewsSchema);
