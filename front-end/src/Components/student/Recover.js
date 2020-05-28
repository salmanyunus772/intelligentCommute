import React from "react";
import axios from "axios";
import "./css/recover.css";
import RecoverComponent from "./recoverComponent";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default class Recover extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.defaultPage = this.defaultPage.bind(this);
    this.emialSentPage = this.emialSentPage.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    

    this.state = {
      email: "",
      emailSent: false,
      loading: false
    };
  }
  verifyEmail(){
    //eslint-disable-next-line
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(this.state.email).toLowerCase())) {
      return false
    }
    return true
  }
  onSubmit() {
    if(this.verifyEmail()){
      this.setState({ loading: true  });
      
      axios
        .post("http://localhost:3000/api/student/recover", {
          email:this.state.email
        })
        .then(data => {
          if( data.status===200){
            this.setState({
              emailSent:true,
              loading:false
            });
          }
        })
        .catch(err => {
          this.setState({
            loading:false
          });
          store.addNotification({
            title: err.response.data.error,
            message: "",
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
        });
      }
      else{
        store.addNotification({
          title: "Email required",
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
  onChangeEmail(e) {
    
    this.setState({ email: e.target.value });
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

          <span>Enter your email</span>
          <fieldset  disabled={isDisabled} >
            <RecoverComponent
              onChangeEmail={this.onChangeEmail}
              onSubmit={this.onSubmit}
            />
            <div className="recoverFormBottom">
            <Link to="/student/register" className="recoverSignup recoverA">
              Sign up
            </Link>
            <Link to="/student/login" className="recoverLogin recoverA">
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
