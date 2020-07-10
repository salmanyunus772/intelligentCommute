const Student = require("../models/student");
const lostfound=require("../models/lostfound");
const Driver=require("../models/driver");
const complaint=require("../models/complaint");
const drv_complaint=require("../models/Driver_complaints");
const lostfounditem=require("../models/lostfound");
const Route = require("../models/route");
const Stop=require("../models/stop");
const Bus = require("../models/bus");
const image = require("../models/dummy");
const Plan=require("../models/plan");
const Schedule=require("../models/schedule");
const Fuel=require("../models/fuelRecords");
const newsfromadmin=require("../models/postnews");
const Attendances=require("../models/attendance");
const Notification = require("../models/notification");
const AuthenticStds=require('../models/authentic_stds');
const Fakenews=require('../models/fakenews');
const util = require("./utils");
const cam_Rfid=require("../models/authentic_stds");
const lostfoundresponse=require("../models/lostfoundresponse");
// npm run-script dev

module.exports = {
  addStudent: data => {
    let newStudent = {
      email: data.email,
      pass: data.pass,
      firstName: data.firstName,
      lastName: data.lastName,
      reg: data.reg,
      stop: data.stop,
      EmergencyContact:data.EmergencyContact,
      Confirm:false
    };

    newStudent.pass = util.encryptPassword(newStudent.pass);

    let student = new Student(newStudent);
    return student.save();
  },
  addlostfound:data=>{
    let itemlostfound={
      from:data.from,
      date:data.date,
      type:data.type,
      description:data.description,
      img:data.img,
    };
    let item=new lostfounditem(itemlostfound); 
    return item.save();
  },
  addComplain:data=>{
    let complaintsuggestion={
      from:data.from,
      date:data.date,
      type:data.type,
      description:data.description,
      AdminResponse:data.AdminResponse
    };
    let comp_sugg=new complaint(complaintsuggestion); 
    return comp_sugg.save();
  },
  addNews:data=>{
    let newsposted={
      date:data.date,
      news:data.news
    };
    let adminnews=new newsfromadmin(newsposted); 
    return adminnews.save();
  },
  addFakeNews:data=>{
    let fakenews={
      date:data.date,
      news:data.news
    };
    let adminfakenews=new Fakenews(fakenews); 
    return adminfakenews.save();
  },
  
  addAttendance:data=>{
    let stdAttendance={
      busId:data.busId,
      rfid:data.rfid,
      date:data.date
    };
    let stdAttendances=new Attendances(stdAttendance); 
    return stdAttendances.save();
  },

  AuthenticAttendance:data=>{
    let auth_attendance={
      busId:data.busId,
      rfid_count:data.rfid_count,
      camera_count:data.camera_count,
      Date:data.Date
    };
    let AuthAttendances=new AuthenticStds(auth_attendance); 
    return AuthAttendances.save();
  },

  addBus:data=>{
    let bus={
      busNumber:data.busNumber,
      noOfSeats:data.noOfSeats,
      occupiedSeats:data.occupiedSeats
    };
    let buses=new Bus(bus); 
    return buses.save();
  },
  getNews:()=>{
  return newsfromadmin.find().sort({date:'desc'});
  },
  addImage:data=>{
    let dummy_img={
      img:data.img
    };
    let dummy_imggg=new image(dummy_img); 
    return dummy_imggg.save();
  },
  findStudentByEmail: email => {
    return Student.findOne({ email: email });
  },
  findcameraCountstdonBus:busId=>{
      return cam_Rfid.find({busId:busId})
  },
  findStudentByReg: reg => {
    return Student.findOne({ reg: reg });
  },
  AssignBusToRoute: (route_id,busNumber) => {
    return Route.findOneAndUpdate({ route_id: route_id },{$set:{bus_id:busNumber}});
  },
  addLostFoundResponse:data=>{
    let lfr={
      id:data.id,
      responseFrom:data.responseFrom,
      responderPhoneNumber:data.responderPhoneNumber,
      responseDate:data.responseDate,
      reply:data.reply,
      img:data.img
    };
    let lfreply=new lostfoundresponse(lfr); 
    return lfreply.save();
  },
  changeStudentPassword: (email, pass) => {
    Student.findOne({ email: email }, function(err, doc) {
      doc.pass = pass;
      doc.save();
    });
  },
  updateDriverContact:(firstName,lastName,ucell)=>{
    return Driver.findOne({firstName:firstName,lastName:lastName},function(err,doc){
      console.log('updATED CELL==',ucell);
      doc.cell=ucell
      console.log(doc.cell);
      doc.save();
    });
  },
  recoverpassword:(email,password)=>{
    return Student.findOne({email:email},function(err,doc){
      let newpwd=util.encryptPassword(password); 
      doc.pass=newpwd;
       doc.save();
    });
  },
  recoverdriverpassword:(contact,password)=>{
    return Driver.findOne({cell:contact},function(err,doc){
      let newpwd=util.encryptPassword(password); 
      doc.pass=newpwd;
       doc.save();
    });
  },

  profileupdate: (reg,s_email,s_contact,s_stop)=>{
    return Student.findOne({reg:reg},function(err,doc){
     doc.email=s_email;
     doc.stop=s_stop;
     doc.EmergencyContact=s_contact;
     doc.save();
    });
  },
  cancelStudent:reg=>{
    console.log(reg)
    return Student.findOneAndDelete({reg:reg})
  },
  DeleteLostFoundPost:id=>{
    return lostfounditem.findOneAndDelete({_id:id})
  },
  deleteStudent: () => {},

  findRouteSchedule: route_id => {
    return Schedule.findOne({ routeId: route_id });
  },
  findRoute: routeid=>{
    return Route.findOne({route_id:routeid})
  },
  
  findStop: stop => {
    return Route.find({ stops: { $in: [stop] } });
  },
  findSeatOnBus: bus_nbr => {
    return Bus.find({ noOfSeats: { busNumber:bus_nbr} });
  },
  
  getBus: busNumber => {
    return Bus.findOne({ busNumber: busNumber });
  }, 

  getAllBuses:()=>{
    return Bus.find({});
  },
  getScheduledBus: busNumber => {
    return Schedule.find({ busNumber: busNumber})
  }, 
  seatOccupy:(bus_nbr)=>{
    return Bus.findOne({ busNumber: bus_nbr },function(err,doc){
      doc.occupiedSeats=(doc.occupiedSeats)+1;
      doc.save();
    });

  },
  seatVacant:(bus_nbr)=>{
    return Bus.findOne({ busNumber: bus_nbr },function(err,doc){
      doc.occupiedSeats=(doc.occupiedSeats)-1;
      doc.save();
    });

  },
  
  getStudentNotifications:()=>{
    return Notification.find({to:'students'}).sort({date:'desc'});
  },
  addNotification:(notification)=>{
    let n = new Notification(notification);
    return n.save();
  },
  getExpiredStudents:()=>{
    return Student.find({ serviceExpiresOn: {
      $lte: Date.now()
  }})
  },
  getStudentsWithoutRfids:()=>{
    return Student.find({ rfid: {
      $exists: false
  }})
  },
  getStudentsWithRfids:()=>{
    return Student.find({ rfid: {
      $exists: true
  }})
  },
  getBustoDelete:()=>{
    return Bus.find({}) 
  },
  getAllBuses:()=>{
    return Bus.find({}) 
  },
  getAllDriversbyName:()=>{
    return Driver.find({}) 
  },
  findBusAgainstItsStop:(stop)=>{
    return Route.find({})

  },
  findBusByNumberandDelete:busNumber=>{
    return Bus.findOneAndDelete({busNumber:busNumber})
  },

  getAllStudents:()=>{
    return Student.find({})
  },

  addDriver: data => {
    let newDriver = {
      firstName: data.firstName,
      lastName: data.lastName,
      cell: data.cell,
      pass: data.pass
    };
    newDriver.pass = util.encryptPassword(newDriver.pass);

    let driverr = new Driver(newDriver);
    return driverr.save();
  },
  addDriverComplain:data=>{
    let drivercomplaint={
      from:data.from,
      date:data.date,
      description:data.description,
      AdminResponse:data.AdminResponse
    };
    let comp=new drv_complaint(drivercomplaint); 
    return comp.save();
  },
  findDriverByCell: cell => {
    return Driver.findOne({ cell: cell });
  },
  findDriverDetails: id => {
    return Driver.findOne({ _id: id });
  },
  findComplains:()=>{
    return complaint.find({});
  },
  addAdminComplainResponse:(id,res)=>{
    return complaint.findOne({_id:id },function(err,doc){
      doc.AdminResponse=res;
      doc.save();
    });

  },

  addAdminComplainDriverResponse:(id,res)=>{
    return drv_complaint.findOne({_id:id },function(err,doc){
      doc.AdminResponse=res;
      doc.save();
    });

  },



  RespondLostFound:(id,lfres,regis)=>{
   return lostfounditem.findOne({_id:id},function(err,doc){
    doc.responses=[lfres+" And My Registration No is "+regis];
      doc.save();
    })

  },

  findFakeDates:()=>{
    return Fakenews.distinct("date");
  },
  findDatesOnBus:(busNbr)=>{
    return Attendances.distinct("date",{busId:busNbr});
  },
  findDates:()=>{
    return Attendances.distinct("date");
  },
  findTotalBusSeats:(busNbr)=>{
    return Bus.find({busNumber:busNbr})
  },
  CheckRfidCountDates:(date)=>{
    return AuthenticStds.find({Date:date});
  },

  findCount:date=>{
    return Attendances.find({date:date}).count();
  },
  
  findBuses:()=>{
    return Bus.find({}) 
  },
  findDriverComplains:()=>{
    return drv_complaint.find({});
  },
  findlost:()=>{
    return lostfounditem.find({});
  },
  
  
  
  addRoute:data=>{
    let newroute={
      route_id:data.id,
      stops:[data.stop+""]
    };
    let route=new Route(newroute); 
    return route.save();
  },
  GetDriverSchedule:(_id)=>{
    return Schedule.find({driverId:_id})
  },
  getRoutes:()=>{
    return Route.find({})
  },
  createPlan:(plan)=>{
    let newPlan = new Plan(plan);
    return newPlan.save()
  },
  createSchedule:(schedule)=>{
    let newSchedule = new Schedule(schedule);
    return newSchedule.save()
  },
  createFuelRecord:(fuelRecord)=>{
    let newfuelRecord = new Fuel(fuelRecord);
    return newfuelRecord.save()
  },
  
  findDriverbyContact:(cell)=>{
    return Driver.findOne({cell:cell})
  },
  getPlans:()=>{
    return Plan.find({});
  },
  getStudentsByRoute:(routeId)=>{
    return Student.find({
      routeId
    })
  }
  ,
  getAllRoutes:()=>{
    return Route.find({})
  },
  getRoute:(routeId)=>{
    return Route.findOne({
      route_id:routeId
    })
  }


};
