const express = require('express');
const app = express();
const port= process.env.PORT || 3001;
const studentRouter = require('./routers/studentRouter');
const driverRouter =require('./routers/driverRouter');
const adminRouter = require('./routers/adminRouter');
const mongoose = require('mongoose');
const path=require('path');
const errorhandler=require('errorhandler');
// mongoose.connect('mongodb://localhost:27017/app',{ useNewUrlParser: true })
 //mongoose.connect('mongodb+srv://SalmanYunus:uzIe6z65uEnwefW0@fyp-asd-m0s6z.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology:true})

mongoose.connect('mongodb+srv://IntelCommute:mMcb0lf2kLsqrV07@fyp-asd-bjmc4.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology:true})

app.use(express.json());
app.use('/api/student',studentRouter);
app.use('/api/admin',adminRouter);
app.use('/api/driver',driverRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}
app.use(express.static('imageFolder'));


app.use(errorhandler());
app.listen(port,()=>{
    console.log('Server started at port 3001');
})