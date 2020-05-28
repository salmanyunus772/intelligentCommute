import React from "react";
import "../css/signIn.css";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import SignInComponent from "./SignInComponent";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Loading from "./Loading";
import { Link } from "react-router-dom";
export default class AdminSignIn extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.verify = this.verify.bind(this);
    this.state = { email: "", pass: "", loading: false, error: false,redirect:false };
  }
  componentWillMount(){
    if(localStorage.getItem('token')){
      this.setState({
        redirect:false
      })
    }
  }

  verify(){
    //eslint-disable-next-line
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(this.state.email).toLowerCase())) {
      return false
    }
    return true
  }
  onSubmit() {
    if(this.verify()){
   this.setState({ loading: true });
    axios
      .post("/api/admin/login", {
        email: this.state.email,
        pass: this.state.pass
      })
      .then(data => {
        let token =  data.data.token

        localStorage.setItem("token",token);
        this.setState({redirect:true});
        
     
      })
      .catch(err => {
        this.setState({ loading: false, redirect:false });
        store.addNotification({
          title: "Incorrect Email/password",
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
      });
  }else{
      store.addNotification({
        title: "Provide correct email",
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
  onChangePass(e) {
    this.setState({ pass: e.target.value });
  }
  render() {
    if(this.state.redirect !== true){
      let loading="";
      let disabled=false;
      let blurred="";
      if(this.state.loading){
        loading=<Loading/ >;
        disabled=true;
        blurred="blur"
      }
      return (
        <div className="signIn">
          <img alt="Logo" className="logo" src={require('../../icons/icon.svg')}  /> 
          <div className="signInComponentContainer ">
          <ReactNotification />
          <div className="signInContainer">
            <div className="signInHeading">
              <h2 className="signInH2" style={{fontFamily:'Coronetscript, cursive',fontWeight:'bold'}}>Sign In</h2>
            </div>
            {loading}
            <div className={blurred}>
            <fieldset disabled={disabled}>
              <SignInComponent
                  onChangeEmail={this.onChangeEmail}
                  onChangePass={this.onChangePass}
                  onSubmit={this.onSubmit}
              />
              </fieldset>
            </div>
            <div className="signInFormBottom">
              <Link to="/student/recover" className="signInForget signInA">
                Forgot Password 
              </Link>
              {/* <Link to="/student/register" className="signInSignup signInA">
                Sign up
              </Link> */}
            </div>
          </div>
        </div>
        </div>
      );
      
    }else{
      return <Redirect to='/admin/' />
    }
    }
}
