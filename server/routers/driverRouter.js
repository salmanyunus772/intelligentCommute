const express = require("express");
const driverRouter = express.Router();
const utils = require("../utils/utils");
const db = require("../utils/db");

const fs = require("fs");
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../imageFolder/')
  },
  filename: function (req, file, cb) {
    console.log("Hello "+file);
      cb(null, file.originalname);
  }
});
const fileFilter=(req,file,cb)=>{
   if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
     cb(null,true);
   }
   else{
     cb(null,false);
   }

};
const upload = multer({ storage: storage , limits:{
fileSize:1024 * 1024 * 5
},
fileFilter:fileFilter
});

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
    db.updateDriverContact(req.authData.firstName,req.authData.lastName,req.body.cell)
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
  db.addDriverComplain({from:req.authData.firstName+" "+req.authData.lastName+" "+req.authData.cell,date:Date.now(),description:req.body.description,AdminResponse:req.body.AdminResponse})
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
// driverRouter.post("/lost",validate.token,(req,res) => {
// db.addlostfound({from:req.authData.firstName+" "+req.authData.lastName,date:Date.now(),type:req.body.type,description:req.body.description,img:req.body.img})
// .then(()=>{
//   console.log("lost found posted");
//   res.json({message:'Lost/Found Item Posted'});
// })
// .catch(err => {
//   console.log(err);
//   res.status(400).json({ error:err });
// });
// }
// );

driverRouter.post("/lostWithoutImage", validate.token, upload.none(), (req,res) => {
  if(req.body.desc.length<=10){
    res.status(400).json({error: req.body.lf+" should be descriptive"});
  }
  else{
    db.addlostfound({from:req.authData.firstName+" "+req.authData.lastName,date:Date.now(),type:req.body.lf,description:req.body.desc,img:""})
    .then(()=>{
      console.log("lost found posted");
      res.json({message:'Lost/Found Item Posted'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error:err });
    });
  }
}
);

driverRouter.post("/lostWithImage", validate.token, upload.single("image"), (req,res) => {
  if(req.body.desc.length<=10){
    res.status(400).json({error: req.body.type+" should be descriptive"});
    unlinkAsync(req.file.path);
  }
  else{
    db.addlostfound({from:req.authData.firstName+" "+req.authData.lastName,date:Date.now(),type:req.body.lf,description:req.body.desc,img:req.file.originalname})
    .then(()=>{
      console.log("lost found posted");
      res.json({message:'Lost/Found Item Posted'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error:err });
    });
  }
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
  console.log('rec');
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
driverRouter.post("/getCameraStd",async (req, res, next) => {
  var count=[];
  let busid="ACX-851";
  db.findcameraCountstdonBus(busid).then(async(doc)=>{
    // db.findDatesOnBus(doc[0].bus_id).then(async (doc1)=>{
      db.findTotalBusSeats(doc[0].busId).then(async(busSeats)=>{
        console.log('bus seats are===',busSeats[0].noOfSeats);
        const totalSeats=busSeats[0].noOfSeats
        const data=await doc.map(async(element) => {
            var obj={
              rfid_count:element.rfid_count ,
     camera_count: element.camera_count,
Date: element.Date,
totalSeats:totalSeats
            }
            return obj
          })
          Promise.all(data).then((values)=>{
            return res.json(values)
          })
      })
      .catch(err => { 
        console.log(err);
        res.status(400).json({ error:err });
        }); 
        
// })
// .catch(err => { 
// console.log(err);
// res.status(400).json({ error:err });
// }); 

  })
  .catch(err => { 
    console.log(err);
    res.status(400).json({ error:err });
    }); 

});


driverRouter.post("/AuthenticStdCount",async (req,res) => {
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
        // res.json({rfidscount,buseats})
  db.AuthenticAttendance({busId:busid,rfid_count:rfidscount,camera_count:cam_countedStd,Date:parsedDate})
  .then(()=>{
    res.json({message:'Total Rfid_Students and camera stds counted and stored.........'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
        })
      })
        .catch(err => { 
          console.log(err);
          res.status(400).json({ error:err });
          });  
        
        });

        driverRouter.post("/viewlostbydriver",validate.token,(req, res, next) => {
          let contact=req.authData.cell
          let findlostitem=[];
          db.findlost().then((doc)=>{
            doc.forEach((element,index) => {
              findlostitem.push({id:element._id,from:element.from,date:element.date,type:element.type,
                description:element.description,img:element.img});
            });
            res.json( {findlostitem,contact});
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({ error:err });
          });
        
        });
  

module.exports = driverRouter;
