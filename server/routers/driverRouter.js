const express = require("express");
const driverRouter = express.Router();
const utils = require("../utils/utils");
const db = require("../utils/db");

const validate = require("../middleware/validate");

driverRouter.post(
  "/registerdriver",
  validate.name,
  validate.pass,
  validate.cell,
  (req, res) => {
    db.addDriver(req.body).then(() => {
      const token = utils.driverToken(req.body);
      res.json({ token: token });
    });
  }
);
driverRouter.post("/updatedrivercontact",validate.token,(req,res)=>{
    db.updateDriverContact(req.authData.firstName,req.authData.lastName,req.authData.cell)
  .then(()=>{
    console.log('contact updated');
    res.json({message:'Contact Updated'})
  })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error:err });
    });

  });

driverRouter.post("/complain",validate.token,(req,res) => {
  db.addDriverComplain({from:req.authData.firstName+" "+req.authData.lastName+" "+req.authData.cell,date:Date.now(),description:req.body.description,AdminCompResponse:req.body.AdminCompResponse})
  .then(()=>{
    console.log("complaint added");
    res.json({message:'Complaint Sent to Admin'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
}
);
driverRouter.post("/lost",validate.token,(req,res) => {
db.addlostfound({from:req.authData.firstName+" "+req.authData.lastName,date:Date.now(),type:req.body.type,description:req.body.description,img:req.body.img})
.then(()=>{
  console.log("lost found posted");
  res.json({message:'Lost/Found Item Posted'});
})
.catch(err => {
  console.log(err);
  res.status(400).json({ error:err });
});
}
);
driverRouter.post('/viewProfile',validate.token,(req,res)=>{
  db.findDriverByCell(req.authData.cell)
  .then(doc=>{
    if(doc){
      res.json({
        firstName:doc.firstName,
        lastName:doc.lastName,
        cell:doc.cell})
    }
    else{
      res.status(400).json({ error: "Driver Profile does not exist" });
    }
  })
  .catch(err => {
    res.status(400).json({ error:err });
  });
});
driverRouter.get('/viewSchedule',validate.token,(req,res)=>{
  let d_schedules=[];
      db.findDriverByCell(req.authData.cell).then((doc)=>{
        if(doc){
          db.GetDriverSchedule(doc._id).then((doc)=>{
          doc.forEach((element,index) => {
          d_schedules.push({id:element._id,routeId:element.routeId,busNumber:element.busNumber,
            startingDate:element.startingDate,endingDate:element.endingDate});
        });
        res.json( {d_schedules});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    }});
 });

 
 driverRouter.post("/login", (req, res) => {
 
  db.findDriverByCell(req.body.cell)
    .then(doc => {
      if (doc === null) {
        res.status(400).json({ error: "Incorrect Cell Number" });
      } else {
        if (utils.checkPass(req.body.pass, doc.pass)) {
          const token = utils.driverToken(doc);
          res.json({ token: token });
        } else {
          res.status(400).json({ error: "Incorrect password" });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: "Server Error" });
    });
}); 
driverRouter.post("/recover", (req, res, next) => {
  db.findDriverByCell(req.body.contact)
    .then(doc => {
      if (doc === null) {
        res.status(400).json({ error: " Number Not Valid and You cannot set your password" });
      }
      else{
        db.recoverdriverpassword(req.body.contact,req.body.password).then(()=>{
          console.log('Password updated');
          res.json({message:'Password Updated'})
        })
          .catch(err => {
            console.log(err);
            res.status(400).json({ error:err });
          }); 
      }
    }).catch(err => {
      console.log(err);
      res.status(400).json({ error: "Server Error" });
    });
  
  
});


driverRouter.post("/AuthenticStdCount",(req,res) => {
  const cam_countedStd = parseInt(req.query.camera_count);
  console.log('ur camera count')
  console.log(cam_countedStd);
  var busid='ACX-851';
  var date = new Date();
  let newDate = new Date(Date.parse(date));
  var year = newDate.getFullYear();
  var day = newDate.getDate();
  var month = newDate.getMonth()+1;
  let parsedDate = day + '-' + month + '-' + year;
  db.findCount(parsedDate).then((doc)=>{ 
    const rfidscount=doc;
    db.findTotalBusSeats(busid).then((busSeats)=>{
      const buseats=busSeats[0].noOfSeats;
        res.json({rfidscount,buseats})
        })
      
      })
        .catch(err => { 
          console.log(err);
          res.status(400).json({ error:err });
          });  
    });
  





module.exports = driverRouter;
