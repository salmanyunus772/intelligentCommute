//import React from "react";
import "./css/register.css";
import RegisterComponent from "./RegisterComponent";
import axios from "axios";
import Loading from "./css/Loading";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "./css/registerComponent.css";
import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Routemap1 from "./homeComponents/RouteMaps/Routemap1";
import Routemap2 from "./homeComponents/RouteMaps/Routemap2";

const iconPerson = new L.Icon({
    iconUrl: require('../../icons/marker1.png'),
    iconRetinaUrl: require('../../icons/marker1.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    
});
export default class Register extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.verify = this.verify.bind(this);
    this.notify = this.notify.bind(this);
   

    this.state = {
      loading: false,
      stop: "",
      EmergencyContact:1,
      pass: "",
      email: "sssss",
      firstName: "",
      lastName: "",
      reg: "",
      cPass: "",
   
    
    };
  
  }
  onChangeData(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
   
  }

  onSubmit() {
    this.setState({ loading: true });
    
    if (this.verify()) {
      axios
        .post("/api/student/register", {
          pass: this.state.pass,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          reg: this.state.reg,
          stop: this.state.stop,
          EmergencyContact:this.state.EmergencyContact
        })
        .then(data => {
          this.notify("Student Registered", "success");
          let token = data.data.token;
          this.setState({ loading: false });
          localStorage.setItem("token",token);
        })
        .catch(err => {
          console.log(err);
          this.notify(err.response.data.error, "danger");
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  verify() {
    //eslint-disable-next-line
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(this.state.email).toLowerCase())) {
      this.notify("Provide correct email", "danger");
      return false;
    }
    if (this.state.firstName === "" || this.state.lastName === "" || this.state.firstName.length < 3  || this.state.lastName < 3 )  {
      this.notify("Name grater than 3 character is required", "danger");
      return false;
    }
    var regex2= /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!regex2.test(String(this.state.firstName).toLowerCase())) {
      this.notify("First Name is invalid", "danger");
      return false;
    }
    var regex3= /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!regex3.test(String(this.state.lastName).toLowerCase())) {
      this.notify("Last Name is invalid", "danger");
      return false;
    }
    if (this.state.pass !== this.state.cPass) {
      this.notify("Password required", "danger");
      return false;
    }

    if (this.state.reg === "" || this.state.reg.length < 12 ) {
      this.notify("Reg required", "danger");
      return false;
    }
    if (this.state.EmergencyContact.length < 11 ) {
      this.notify("Emergency Contact Required", "danger");
      return false;
    }
    if (this.state.stop ==" " ) {
      this.notify("Bus Stop Required", "danger");
      return false;
    }
    return true;
  }
  notify(message, type) {
   // console.log(message + " " + type);
    store.addNotification({
      title: message,
      message: " ",
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  render() {
    let loading = "";
    // let mapping="";
    // let routemap2="";
    let containerClassess = "registerContainer ";
    if (this.state.loading === true) {
      loading = <Loading />;
      containerClassess += " blur";
    }
    
    // if(this.state.stop=="IJP Road"){
    //     mapping=<Routemap1 waypoints={[]} />  
    // }
    
    // if(this.state.stop=="saddar"){
    //   routemap2=<Routemap2 />;
    // }
    return (
      <div className="register">
       <img alt="Logo" className="logo" src={require('../../icons/icon.svg')}  /> 
        {loading}
       
        <div className={containerClassess}>
          <ReactNotification />
          <div className="registerHeading">
            <h2 className="registerH2" style={{fontFamily:'Coronetscript, cursive',fontWeight:'bold'}}>Register</h2>
          </div>
          <RegisterComponent
            onChange={this.onChangeData}
            onClick={this.onSubmit}
          />
           {/* {mapping}
          {routemap2} */}

                  </div>
   
      <p></p>
      <p></p>
            
      </div>
    );
  }
}
