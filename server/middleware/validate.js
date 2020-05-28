const Student = require("../models/student");
const Route = require("../models/route");
const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");
const db = require("../utils/db");
module.exports={

    email:function(req, res, next) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(req.body.email).toLowerCase())) {
      db.findStudentByEmail(req.body.email).then((doc)=>{
        if (doc === null) {
          next();
        } else {
          res.status(400).json({ error: "Email already registered" });
        }
      })
    } else {
      res.status(400).json({ error: "Provide correct email" });
    }
  }
  ,
pass:function(req, res, next) {
  
    if (req.body.pass) {
      if (req.body.pass.length < 8) {
        res.status(400).json({ error: "Choose Better Pass" });
      } else {
  
        next();
      }
    } else {
      res.status(400).json({ error: "Provide Pass" });
    }
  },
  cell:function(req, res, next) {
  
    if (req.body.cell) {
      if (req.body.cell.length < 11) {
        res.status(400).json({ error: "Cell Number must be Valid or 11 digits" });
      } else {
        next();
      }
    } else {
      res.status(400).json({ error: "Provide Cell Number" });
    }
  },
name:function(req, res, next) {
  
    if (
      req.body.firstName === undefined ||
      req.body.firstName.length === 0 ||
      req.body.lastName === undefined ||
      req.body.lastName === 0
    ) {
      res.status(400).json({ error: "Provide full name" });
    } else {
  
      next();
    }
  }
  ,
 reg:function(req, res, next) {
  
    db.findStudentByReg(req.body.reg).then(( doc) => {
      console.log(doc);
      if (doc === undefined || doc=== null) {
        next();
      } else {
        res.status(400).json({ error: "Reg already registered" });
      }
    })
  },
  seats:function(req,res,next){
    db.findStop(req.body.stop).then((data)=>{
      db.getBus(data[0].bus_id).then((doc)=>{
        if(doc.occupiedSeats<=doc.noOfSeats){
          next();
        }
        else{ res.status(400).json({ error: "Sorry Seats are already Full" }); }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error:"Bus has not been assigned to this Stop" });
      });
  }) .catch(err => {
      console.log(err);
      res.status(400).json({ error:"Stop has not been assigned to any Route" });
    });
    
  },
  token:function(req, res, next) {
    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      try{
        
        req.authData=utils.checkToken(token)
        
        next();
      }catch(e){
        res.status(403).json({ error: "Incorrect token" });
      } 
    } else {
      res.status(409).json({ error: "Token required" });
    }
  },
  recoveryEmail:function(req, res, next) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(req.body.email).toLowerCase())) {
      db.findStudentByEmail(req.body.email).then((doc)=>{
        if (doc === null) {
          res.status(400).json({ error: "Email not registered" }); 
        } else {
          next();
        }
      })
    } else {
      res.status(400).json({ error: "Provide correct email" });
    }
  }
}
