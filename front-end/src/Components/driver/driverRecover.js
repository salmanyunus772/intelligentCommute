import React from "react";
import axios from "axios";
import "./css/recover.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Loading from "./Loadingdriver";
import { Link } from "react-router-dom";
import RecoverComp from "../driver/RecoverComp";

export default class driverRecover extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.defaultPage = this.defaultPage.bind(this);
    this.emialSentPage = this.emialSentPage.bind(this);
    this.verifyContact = this.verifyContact.bind(this);
    this.verifyPassword=this.verifyPassword.bind(this);
    

    this.state = {
      contact: "",
      password:"",
      emailSent: false,
      loading: false
    };
  }
  verifyContact(){
    //eslint-disable-next-line
    if(this.state.contact.length<11){
        return false;
      }
      return true
  }
  verifyPassword(){
    if(this.state.password.length<8){
      return false;
    }
    return true
  }

  onSubmit() {
    if(this.verifyContact()){
      if(this.verifyPassword()){      
      this.setState({ loading: true  });
      axios
      // http://localhost:3000
        .post("/api/driver/recover", {
          contact:this.state.contact,
          password:this.state.password
        })
        .then(response => {
          this.setState({loading:false})
          store.addNotification({
              title: "Success",
              message: response.data.message,
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({loading:false})
      store.addNotification({
          title: "No Driver with this Number ",
          message: "Not Sent",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
    });

  })
    }else{
        store.addNotification({
          title: "Password length less than 8",
          message: "try again",
          type: "danger",
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
  }

      else{
        store.addNotification({
          title: "Number Not Valid",
          message: "try again",
          type: "danger",
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
  }
  onChangeContact(e) {
    
    this.setState({ contact: e.target.value });
  }
  onChangePassword(e) {  
    this.setState({ password: e.target.value });
  }
  

  defaultPage() {
    let isDisabled=false
    let loading=""
    let containerClassess="recoverContainer "
    if(this.state.loading===true){
      isDisabled=true;
      loading=<Loading />;
      containerClassess+=" blur"
    }
    return (
      <div className="recoverComponentContainer ">
        <img alt="Logo" className="logo" src={require('../../icons/icon.svg')}  /> 
        <ReactNotification />
        {loading}
        <div className={containerClassess} >
          <div className="recoverHeading">
            <h2 className="recoverH2">Recover Account</h2>
          </div>

          <span>Enter your Contact & Password </span>
          <fieldset  disabled={isDisabled} >
            <RecoverComp
              onChangeContact={this.onChangeContact}
              onChangePassword={this.onChangePassword}
              onSubmit={this.onSubmit}
            />
            <div className="recoverFormBottom">
            <Link to="/driver/registerdriver" className="recoverSignup recoverA">
              Sign up
            </Link>
            <Link to="/driver/login" className="recoverLogin recoverA">
              Login
            </Link>
          </div>
          </fieldset>
          
        </div>
      </div>
    );
  }

  emialSentPage() {
    return (
      
      <div className="recoverComponentContainer ">
        <img className="logo" alt="Logo" src={require('../../icons/icon.svg')}  /> 
        <div className="recoverContainer ">
          <h2 className="recoverH2 ">Check your email for account recovery</h2>
          <div className="recoverFormBottom">
            <Link to="/student/login" className="recoverLogin recoverA">
              Login
            </Link>
          </div>
        
        </div>
        
      </div>
    );
  }
  render() {
    if (this.state.emailSent === false) {
      return this.defaultPage();
    } else {
      return this.emialSentPage();
    }
  }
}
