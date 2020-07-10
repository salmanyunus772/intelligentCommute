const express = require("express");
const adminRouter = express.Router();
const utils = require("../utils/utils");
const db = require("../utils/db");
const url = require('url');

const validate = require("../middleware/validate");



adminRouter.post("/login", (req, res, next) => {
 if((req.body.pass=="444") && (req.body.email==="admin@admin.com")){
   res.json({token:utils.genToken({email:req.email})});
 }else{
   res.status(401).json({error:"incorrect credentials"})
 }
});

adminRouter.post("/getadmin", validate.token, (req, res, next) => {
  res.send(req.authData);
});


adminRouter.post("/addNotification", (req, res, next) => {
  db.addNotification({to:req.body.to,from:req.body.from,title:req.body.title,type:req.body.type,details:req.body.details}).then(()=>{
    res.json({hello:'abc'});
  })
});
adminRouter.post("/addBus", (req, res, next) => {
  db.addBus({busNumber:req.body.busNumber,noOfSeats:req.body.noOfSeats,occupiedSeats:req.body.occupiedSeats}).then(()=>{
    res.json({message:'Bus has been Registered'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
});

adminRouter.post("/postNews",(req,res) => {
  db.addNews({date:Date.now(),news:req.body.news})
  .then(()=>{
    res.json({message:'News Has been posted'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
});

adminRouter.post("/rfidAttendance",(req,res) => {
  var date = new Date();
  let newDate = new Date(Date.parse(date));
  var year = newDate.getFullYear();
  var day = newDate.getDate();
  var month = newDate.getMonth()+1;
  let parsedDate = day + '-' + month + '-' + year;
  db.addAttendance({busId:req.body.busId,rfid:req.body.rfid,date:parsedDate})
  .then(()=>{
    res.json({message:'Attendance Marked'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
});


adminRouter.post("/assignRfid", (req, res, next) => {
  db.findStudentByReg(req.body.reg).then((doc)=>{
    doc.rfid=req.body.rfid;
    doc.save();
    res.send("ok")
  })
});

adminRouter.post("/route_ASSIGN", (req, res, next) => {
  let added=false;
  db.findRoute(req.body.id).then((doc)=>{
    if(doc!=null){
      doc.stops.push(req.body.stop);
      added=true;
    }
    else{ 
      db.addRoute(req.body).then(()=>{
        res.json({message:'Stop Assign to Specific Routes'});        
        added=true;
      })
      .catch(err=>{
        console.log(err);
        res.status(400).json({ error:err });
      });
    }
    if(added==true){
      res.json({message:'Stop Assign to Specific Routes'});
      doc.save();
    }
  });
});

// adminRouter.post("/AuthenticStdCount",(req,res) => {
//   const cam_countedStd = parseInt(req.query.camera_count);
//   // console.log('ur camera count.........')
//   // console.log(cam_countedStd);
  
//   var countedrfid=parseInt(req.body.rfid_count)
//   console.log(countedrfid);
//   var date = new Date();
//   let newDate = new Date(Date.parse(date));
//   var year = newDate.getFullYear();
//   var day = newDate.getDate();
//   var month = newDate.getMonth()+1;
//   let parsedDate = day + '-' + month + '-' + year;
//   db.CheckRfidCountDates(parsedDate).then((doc)=>{
//     if(doc.length>0){
//       doc[0].rfid_count=countedrfid;
//       doc[0].save();
//       res.json({message:'Rfid Count Updated..'});
//     }
//     else{
//       db.AuthenticAttendance({busId:req.body.busId,rfid_count:countedrfid,Date:parsedDate})
//       .then(()=>{
//         res.json({message:'Total Rfid_Students counted and stored.........'});
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(400).json({ error:err });
//       });
    
//     }

//   })
// });
adminRouter.post("/assignRouteToBus", (req, res, next) => {
  db.AssignBusToRoute(req.body.route_id,req.body.busNumber).then(()=>{
    res.json({message:'Route assigned to Bus'});
    


    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error:err });
    });
  }
  );

adminRouter.post("/deleteBus", (req, res, next) => {
  db.findBusByNumberandDelete(req.body.number)
    .then(()=>{
      res.json({message:'Bus Record Deleted'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error:err });
    });
  }
  );
adminRouter.get("/getStudentStatus", (req, res, next) => {
  db.getAllStudents().then((doc)=>{
    let students=[];
    doc.forEach(element => {
      students.push({
        firstName:element.firstName,
        lastName:element.lastName,
        reg:element.reg,
        expired: element.serviceExpiresOn > Date.now() ? false :true
      });
    });
    res.json({students:students})
  })
});
adminRouter.get("/getNews",(req,res,next)=>{
  let news=[];
  db.getNews().then((doc)=>{
    doc.forEach((element,index)=>{
      news.push({date:element.date,news:element.news});
    });
    res.json({news});
  })
});
adminRouter.get("/getConfirmStatus", (req, res, next) => {
  db.getAllStudents().then((doc)=>{
    let students=[];
    doc.forEach(element => {
      students.push({
        firstName:element.firstName,
        lastName:element.lastName,
        reg:element.reg,
        Confirm: element.Confirm
      });
    });
    res.json({students:students})
  })
});
adminRouter.post("/extendService",(req,res)=>{
  db.findStudentByReg(req.body.reg).then((doc)=>{
   
    if(!doc.serviceExpiresOn){
      doc.serviceExpiresOn=new Date(Date.now());
    }
      doc.serviceExpiresOn= doc.serviceExpiresOn.setMonth(doc.serviceExpiresOn.getMonth()+6);
      doc.markModified('serviceExpiresOn');
    doc.save();
    res.json({
      message:"ok"
    })
  }).catch(err=>{
    res.status(500).json({
      err:err
    })
  })
  });
  
adminRouter.post("/getAllBusesLocation",validate.token, (req, res, next) => {
  let busLocations=[];
  db.getAllBuses().then((doc)=>{
    doc.forEach(element=>{
      busLocations.push({
        location:element.location,
        busNumber:element.busNumber
      })
    })
    
    res.json(busLocations)
  })
  .catch(()=>{
       res.status(500).json({error:"Server error"});
    })
});
  adminRouter.post("/confirmStudent",(req,res)=>{
    db.findStudentByReg(req.body.reg).then((doc)=>{ 
      db.findStop(doc.stop).then((data)=>{
        db.getBus(data[0].bus_id).then(()=>{
            db.seatOccupy(data[0].bus_id).then(()=>{
            })
      doc.Confirm=true;
      doc.markModified('Confirm');
      doc.save();
      res.json({
        message:"ok"
      })
    }).catch(err=>{
      res.status(500).json({
        err:err
      })
    })
  })
    }).catch(err=>{
      res.status(500).json({
        err:err
      })})
    });
    adminRouter.get("/viewcomplains",(req, res, next) => {
      let complains=[];
      db.findComplains().then((doc)=>{
        doc.forEach((element,index) => {
          if(element.AdminResponse===""){
          complains.push({id:element._id,from:element.from,date:element.date,type:element.type,
            description:element.description});
          }
        });
        res.json( {complains});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    });
    
    adminRouter.post("/complainresponse",(req, res, next) => {
      db.addAdminComplainResponse(req.body._id,req.body.AdminResponse).then(()=>{
        res.json( {message:"Successfully responded to Student"});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    });

    adminRouter.post("/complainresponsedriver",(req, res, next) => {
      db.addAdminComplainDriverResponse(req.body._id,req.body.AdminResponse).then(()=>{
        res.json( {message:"Successfully responded to Driver"});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    });

    adminRouter.get("/getAllDatesCounts",async (req, res, next) => {
      var count=[];
      db.findDates().then(async (doc)=>{
       const data=await doc.map(async(element) => {
          return await db.findCount(element).then(async (doc1)=>{
              const obj = {
                date:await element,
                datecount:doc1
              };
              return obj 
            })
          })
          Promise.all(data).then((values)=>{
            return res.json(values)
          })
          //res.json(count)

  })
  .catch(err => { 
    console.log(err);
    res.status(400).json({ error:err });
  }); 
  
    });

    adminRouter.get("/viewbuses",(req, res, next) => {
      let buses=[];
      db.findBuses().then((doc)=>{  
        doc.forEach((element,index) => {
          buses.push({id:element._id,busNumber:element.busNumber,noOfSeats:element.noOfSeats});
        });
        res.json({buses});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    });
    
    adminRouter.get("/viewdrivercomplains",(req, res, next) => {
      let d_complains=[];
      db.findDriverComplains().then((doc)=>{  
        doc.forEach((element,index) => {
          if(element.AdminResponse===""){
          d_complains.push({id:element._id,from:element.from,date:element.date,
            description:element.description});
          }
        });
        res.json( {d_complains});
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:err });
      });
    
    });
adminRouter.get("/expiredStudents", (req, res, next) => {
  db.getExpiredStudents().then((doc)=>{
    let regs=[];
    doc.forEach(element => {
      regs.push(element.reg);
    });
    res.json({regs:regs})
  })
});
adminRouter.get("/studentsWithoutRfid", (req, res, next) => {
  db.getStudentsWithoutRfids().then((doc)=>{
    let regs=[];
    doc.forEach(element => { 
      regs.push(element.reg);
    });
    res.json({regs:regs})
  })
});
adminRouter.get("/studentsWithRfid", (req, res, next) => {
  db.getStudentsWithRfids().then((doc)=>{
    let authentic_rfids=[];
    doc.forEach(element => { 
      authentic_rfids.push(element.rfid);
    });
    res.json({authentic_rfids:authentic_rfids})
  })
});
adminRouter.get("/getAllBuses", (req, res, next) => {
  db.getAllBuses().then((doc)=>{
    let uniBus=[];
    doc.forEach(element => { 
      uniBus.push(element.busNumber);
    });
    res.json({uniBus:uniBus})
  })
});
adminRouter.get("/getAllRoutes", (req, res, next) => {
  db.getAllRoutes().then((doc)=>{
    let route_ids=[];
    doc.forEach(element => { 
      route_ids.push(element.route_id);
    });
    res.json({route_ids:route_ids})
  })
});
adminRouter.get("/getAllDriversbyName", (req, res, next) => {
  db.getAllDriversbyName().then((doc)=>{
    let drivers=[];
    doc.forEach(element => { 
      drivers.push({id:element._id,firstName:element.firstName,lastName:element.lastName,cell:element.cell});
    });
    res.json({drivers:drivers})
  })
});


adminRouter.post("/addRoute",(req,res,next)=>{
  db.addRoute(req.body.route).then(()=>{
    res.json({message:'ok'});
  }).catch((err)=>{
    res.status(500).json({error:"server error"});
  })
});

adminRouter.post("/createPlan",(req,res)=>{
  console.log('this is ur plan reqqqq')
  console.log(req.body);
  
  db.createPlan(req.body.plan).then(()=>{
    res.status(200).json({message:'ok'});
  }).catch((err)=>{
    res.status(500).json({error:err});
  })
});
adminRouter.post("/createSchedule",(req,res)=>{
  db.createSchedule(req.body.schedule).then(()=>{
    res.status(200).json({message:'ok'});
  }).catch((err)=>{
    res.status(500).json({error:err});
  })
});
adminRouter.post("/busFuelAdd",(req,res)=>{
  db.createFuelRecord(req.body.fuelRecord).then(()=>{
    res.status(200).json({message:'ok'});
  }).catch((err)=>{
    res.status(500).json({error:err});
  })
});


adminRouter.post("/getPlans",(req,res)=>{
  let plans=[];
  db.getPlans().then((docs)=>{
    docs.forEach(element => {
      plans.push(element);
    });
    res.json({plans});
  }).catch((err)=>{
    res.status(500).json({err});
  })
});


adminRouter.post("/calculateSchedules",(req,res)=>{
  let studentCount=[];
  
  db.getAllRoutes().then((docs)=>{
    docs.forEach(doc=>{
      
      db.getStudentsByRoute(doc.id).then((studentDocs)=>{
        let students=[];
        studentDocs.forEach(element=>{
          students.push(element.reg)
        })
        studentCount.push({routeId:doc.id,students})
      })
    })
  })
  
});
module.exports = adminRouter;
