
const mongoose = require('mongoose');
const routeSchema =mongoose.Schema({
    route_id:{
        type: String,
        required:true
    },
    stops:{
        type:Array,
        required:true
    },
    bus_id:{
        type: String
    }
});
module.exports = mongoose.model('routes',routeSchema);