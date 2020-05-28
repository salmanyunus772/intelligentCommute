const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const generator = require('generate-password');

module.exports={

    encryptPassword:(password)=>{
        return bcrypt.hashSync(password, 10);
        
    },
    checkPass:(password,hash)=>{
        return bcrypt.compareSync(password, hash)
    },
    genToken:(data)=>{
       let studentData= {
            firstName: data.firstName,
            lastName: data.lastName,
            reg: data.reg,
            stop: data.stop,
            email: data.email
          }
        if(data.remember){
            return jwt.sign(studentData, "secretkey");
        }else{
            return jwt.sign(studentData, "secretkey",{ expiresIn: 3600 });
        }
    },
    driverToken:(data)=>{
        let driverData= {
             firstName: data.firstName,
             lastName: data.lastName,
             cell: data.cell
           }
         if(data.remember){
             return jwt.sign(driverData, "secretkey");
         }else{
             return jwt.sign(driverData, "secretkey",{ expiresIn: 3600 });
         }
     },
    sendEmail:(email,subject,text)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bustransportservice@gmail.com',
              pass: '3cfe170c'
            }
          });
          
          var mailOptions = {
            from: 'bustransportservice@gmail.com',
            to: email,
            subject: subject,
            text: text
          };
          
         return transporter.sendMail(mailOptions);
    }
    ,
    checkToken:(token)=>{
       
        return jwt.verify(token, "secretkey");
    },
    genPassword:()=>{
     return  generator.generate({
        length: 8,
        numbers: true,
        uppercase: true
    })
    }

}