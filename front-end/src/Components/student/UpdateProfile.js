import React, { Component } from 'react';
import { Form, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import NavLink from 'react-bootstrap/NavLink';
import Profile from "./homeComponents/Profile";

 
export default class UpdateProfile extends Component {
    constructor(){
      super();
      //this.profileupdate = this.profileupdate.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      //this.onChangeEmergencyContact = this.onChangeEmergencyContact.bind(this);
      this.onChangeBus=this.onChangeBus.bind(this);


      this.state={
          email:"",
          updatedreg:"",
          updatedfirstName:"",
          updatedlastName:"",
          updatedrouteId:"",
          updatedbusNumber:"",
          updatedrfid:"",
          updatedserviceExpiresOn:"",
          updatedbalance:""
  
      }
    }
      onChangeEmail(e) {
        this.setState({ email: e.target.value });
      }
      onChangeBus(e){
        this.setState({ busNumber: e.target.value });
      }
  
  
    componentDidMount(){    
      var config = {
        headers: { Authorization: "bearer " + localStorage.getItem("token") }
     };
  
     var bodyParameters = {
     };
     axios
       .post(
        // http://localhost:3000
         "/api/student/viewProfile",
         bodyParameters,
         config
       )
       .then(response => {
        //  console.log(response.data);
        this.setState({
          email:response.data.email,
          reg:response.data.reg,
          firstName:response.data.firstName,
          lastName:response.data.lastName,
          routeId:response.data.routeId,
          busNumber:response.data.busNumber,
          rfid:response.data.rfid,
          serviceExpiresOn:response.data.serviceExpiresOn,
          balance:response.data.balance});
      })
       .catch(error => {
           console.log(error);
       });
  
    }
  
    render() {
      
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
        
        <Profile
            onChangeEmail={this.onChangeEmail}
            onChangeBus={this.onChangeBus}
        
        />
    
        </div>
      );
     
    }
  }
   
 