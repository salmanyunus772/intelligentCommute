const express = require("express");
const studentRouter = express.Router();
const utils = require("../utils/utils");
const db = require("../utils/db");
// const dbs=require("../../imageFolder/")
const crypto = require("crypto")
const path = require("path")
const Upload_image = require("../models/dummy");

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../imageFolder/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now()  + path.extname(file.originalname));
    });
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

studentRouter.post(
  "/register",
    validate.name,
  validate.email,
  validate.pass,
  validate.reg,
  validate.seats,
  (req, res) => {
    db.addStudent(req.body).then(() => {
      const token = utils.genToken(req.body);   
      res.json({ token: token });
    });
  }
);
    
studentRouter.post("/complain",validate.token,(req,res) => {
    db.addComplain({from:req.authData.reg,date:Date.now(),type:req.body.type,description:req.body.description,AdminResponse:req.body.AdminResponse})
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

studentRouter.post("/sendcomplainresponse",(req,res) => {
  db.addComplain({from:req.authData.reg,date:Date.now(),type:req.body.type,description:req.body.description})
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
studentRouter.post("/uploadimg",upload.single('image'),(req,res) => {
  console.log('ACCCCCCCE...')  
 console.log(req.file);
 console.log('ABOVE...')
  db.addImage({img:req.body.img})
  .then(()=>{
    
    res.json({message:'Picture Uploaded in dummy dbb'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
}
);
studentRouter.get("/viewimg",(req,res) => {
    Upload_image.find()
    .select("img")
    .exec()
   .then(docs=>{
     
     const response={
      count:docs.length,
       images:docs.map(doc=>{
        return {
          img:doc.img,
          _id:doc.id,
          request:{
            type:"GET",
            url:"http://localhost:3001/images/"+doc._id
          }
         };
       })
     };
     res.status(200).json(response);
   })
   .catch(err => {
     console.log(err);
     res.status(400).json({ error:err });
   })
   
  }); 


studentRouter.post("/viewlost",validate.token,(req, res, next) => {
  let regis_no=req.authData.reg
  let findlostitem=[];
  db.findlost().then((doc)=>{
    doc.forEach((element,index) => {
      findlostitem.push({id:element._id,from:element.from,date:element.date,type:element.type,
        description:element.description,img:element.img});
    });
    res.json( {findlostitem,regis_no});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });

});
studentRouter.post("/lost",validate.token,(req,res) => {
  db.addlostfound({from:req.authData.reg,date:Date.now(),type:req.body.type,description:req.body.description,img:req.body.img,responses:req.body.responses})
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


studentRouter.post("/lostfoundresponse",(req, res, next) => {
  db.RespondLostFound(req.body._id,req.body.LostFoundResponse,req.body.stdreg).then(()=>{
    res.json( {message:"Successfully responded to Lost Found Post"});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
});

studentRouter.post("/deleteyourlostfoundresponse",(req,res) => {
  console.log(req.body._id);
  db.DeleteLostFoundPost(req.body._id)
  .then(()=>{
    res.json({message:'Your Post has Deleted Successfully.'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
}
);



studentRouter.post("/cancelregistration",validate.token,(req,res) => {
  db.cancelStudent(req.authData.reg).then(()=>{
    res.json({message:'Your Registration has been Cancelled.'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
  db.findStudentByReg(req.authData.reg).then((std_stop)=>{
    db.findStop(std_stop.stop).then((res)=>{
      db.seatVacant(res[0].bus_id).then(()=>{
      })
  })
})
});

studentRouter.post('/attendance',validate.token,(req,res)=>{
  db.findStudentByReg(req.authData.reg)
    .then(doc=>{
      if(doc){
      let newBalance=doc.balance-100;
      if(newBalance>=0){
        doc.balance=newBalance;
        doc.save();
        console.log("here");
        res.json({message:'OK'});
      }else{
        res.status(400).json({ error: "You need to recharge" });
      }
    }else{
      res.status(400).json({ error: "Student does not exist" });
    }
    })
    .catch(err => {
      res.status(400).json({ error:err });
    });
  }
);
studentRouter.post('/viewProfile',validate.token,(req,res)=>{
  db.findStudentByReg(req.authData.reg).then(doc=>{
      db.findStop(doc.stop).then(doc1=>{
        db.findRouteSchedule(doc1[0].route_id).then(schedule_details=>{
          db.findDriverDetails(schedule_details.driverId).then(driver=>{
            res.json({email:doc.email,
              pass:doc.pass,
              firstName:doc.firstName,
              lastName:doc.lastName,
              stop:doc.stop,
              EmergencyContact:doc.EmergencyContact,
              busNumber:schedule_details.busNumber,
              rfid:doc.rfid,
              serviceExpiresOn:doc.serviceExpiresOn,
              id:doc1[0].route_id,
              reg:doc.reg,
              driverName:driver.firstName+' '+driver.lastName,
              driverContact:driver.cell
          })
      
        })
      })
      })
    })  .catch(err => {
      res.status(400).json({ error: "Student Profile does not exist" });
    }); 
});
studentRouter.post('/updateprofile',validate.token,(req,res)=>{
  let s_email=req.body.email;
  let s_Contact=req.body.EmergencyContact;
  let s_stop=req.body.stop;
  db.profileupdate(req.authData.reg,s_email,s_Contact,s_stop)
  .then(()=>{
      res.json({message:"Profile Updated"});
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({ error:err });
  });
}
);

studentRouter.post('/addCredit',validate.token,(req,res)=>{
  db.findStudentByReg(req.authData.reg)
    .then(doc=>{
      if(doc){
        if(doc.balance){
        let newBalance=doc.balance+100;
        doc.balance=newBalance;
        doc.save();
        console.log(doc)
        res.json({message:`Recharge Successful + ${newBalance}`});
        }else{
        doc.balance=100;
        doc.save();
        console.log(doc)
        res.json({message:'Recharge Successful',
      balance:doc.balance});
        }
      }
    else{
      res.status(400).json({ error: "Student does not exist" });
    }
    })
    .catch(err => {
      res.status(400).json({ error:err });
    });
  }
);
studentRouter.post("/login", (req, res, next) => { 
  db.findStudentByEmail(req.body.email)
    .then(doc => {
      if (doc === null) {
        res.status(400).json({ error: "Incorrect email" });
      }      
      if(doc.Confirm==false){
        res.status(400).json({ error: "You Confirmation has not been Approved" });
      } 
      else {
        if (utils.checkPass(req.body.pass, doc.pass)) {
          const token = utils.genToken(doc);
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

studentRouter.post("/getStudent", validate.token, (req, res, next) => {
  res.send(req.authData);
});
studentRouter.post("/recover",validate.recoveryEmail, (req, res, next) => {
  const newPass=utils.genPassword();
  const encryptedPass=utils.encryptPassword(newPass);
  db.changeStudentPassword(req.body.email,encryptedPass); 
  utils.sendEmail(req.body.email,"Reset Password",'This is your new password '+newPass).then(()=>{
    res.json({message:"New password sent to your email"});
  }).catch(()=>{
    res.status(500).json({error:"Try again later"})
  })

});
studentRouter.post("/guestChart",async (req, res, next) => {
  var count=[];
  db.findStop(req.body.stop).then(async(doc)=>{
    db.findDatesOnBus(doc[0].bus_id).then(async (doc1)=>{
      db.findTotalBusSeats(doc[0].bus_id).then(async(busSeats)=>{
        const totalSeats=busSeats[0].noOfSeats
        const data=await doc1.map(async(element) => {
          return await db.findCount(element).then(async (doc2)=>{
            const probcount=(totalSeats-doc2);
            const miss=(doc2/totalSeats)*100;
            const get=(probcount/totalSeats)*100;
              const obj = {
                date:await element,
                datecount:await probcount,
                get_seat:await get,
                miss_seat: await miss
              };
              return obj 
            })
          })
          Promise.all(data).then((values)=>{
            return res.json(values)
          })
      })
      .catch(err => { 
        console.log(err);
        res.status(400).json({ error:err });
        }); 
        
})
.catch(err => { 
console.log(err);
res.status(400).json({ error:err });
}); 

  })
  .catch(err => { 
    console.log(err);
    res.status(400).json({ error:err });
    }); 

});


studentRouter.post("/getLocation",validate.token, (req, res, next) => {
  db.findStudentByEmail(req.authData.email).then((doc)=>{
    return db.getBus(doc.busNumber);
  }).then((doc)=>{
    doc.location=[doc.location[0]-0.001,doc.location[1]-0.001];
    doc.save();
    res.json({lat:doc.location[0],lng:doc.location[1]})
  }).catch(()=>{
    res.status(500).json({error:"Server error"});
  })

});
studentRouter.post("/getNotifications",validate.token, (req, res, next) => {
  let notifications=[];
  db.getStudentNotifications().then((doc)=>{
    
    doc.forEach((element,index) => {
      
      notifications.push({title:element.title,details:element.details});
      
    });
    res.json( {notifications});
  })
  

});

studentRouter.post("/addNotification", (req, res, next) => {
  db.addNotification({to:req.body.to,from:req.body.from,title:req.body.title,type:req.body.type,details:req.body.details}).then(()=>{
    res.json({hello:'abc'});
  })
  
});

studentRouter.post("/studentRoute",validate.token, (req, res) => {
  db.getRoute(req.authData.route).then((doc)=>{
    res.json({route:doc});
  })
});

studentRouter.post("/getroutes",(req,res)=>{
  db.getAllRoutes().then((docs)=>{
    res.json({routes:docs});
  }).catch(()=>{
    res.status(500).json({error:error});
  })
  
});

module.exports = studentRouter;
