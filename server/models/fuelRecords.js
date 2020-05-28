let mongoose = require('mongoose');

let fuelrecordSchema =mongoose.Schema({
    fuelinLitres:{
        type: Number,
        required:true
    },
    fuelinPrice:{
        type: Number,
        required:true
    },
    busNumber:{
        type: String,
        required:true
    },
    fillingDate:{
        type:Date,
        require:true
    }


});
module.exports = mongoose.model('Fuel Records',fuelrecordSchema);
