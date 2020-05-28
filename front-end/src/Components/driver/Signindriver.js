import React from "react";
import "./css/signIn.css";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import SignindriverComponent from "./SignindriverComponent";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Loading from "./Loadingdriver";
import { Link } from "react-router-dom";

export default class SigninDriver extends React.Component {
    constructor() {
      super();
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeCell = this.onChangeCell.bind(this);
      this.onChangePass = this.onChangePass.bind(this);
      this.state = { cell:1, pass: "", loading: false, error: false, redirect: false };
    }
    
    componentWillMount() {
      if (localStorage.getItem('token')) {
        this.setState({
          redirect: false
        })
      }
    }
  
    onSubmit() {
      if (this.state.cell.length>=11) {
        this.setState({ loading: true });
        axios
          .post("/api/driver/login", {
            cell: this.state.cell,
            pass: this.state.pass
          })
          .then(data => {
            let token = data.data.token
            localStorage.setItem("token", token);
            this.setState({ redirect: true });
          })
          .catch(err => {
            this.setState({ loading: false });
            console.log(err);
            store.addNotification({
              title: "Incorrect Cell No or Password",
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
      } else {
        console.log(this.state.cell);
        store.addNotification({
          title: "Provide correct Cell No ",
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
    onChangeCell(e){
      this.setState({ cell:e.target.value  });
    }
    onChangePass(e) {
      this.setState({ pass: e.target.value });
    }
    render() {
      if (this.state.redirect !== true) {
        let loading = "";
        let disabled = false;
        let blurred = "";
        if (this.state.loading) {
          loading = <Loading />;
          disabled = true;
          blurred = "blur"
        }
        return (
          <div className="signIn">
            <img alt="Logo" className="logo" src={require('../../icons/icon.svg')} />
            <div className="signInComponentContainer ">
              <ReactNotification />
              <div className="signInContainer">
                <div className="signInHeading">
                  <h2 className="signInH2" style={{fontFamily:'Coronetscript, cursive',fontWeight:'bold'}}>Sign In</h2>
                </div>
                {loading}
                <div className={blurred}>
                  <fieldset disabled={disabled}>
                    <SignindriverComponent
                      onChangeCell={this.onChangeCell}
                      onChangePass={this.onChangePass}
                      onSubmit={this.onSubmit}
                    />
                  </fieldset>
                </div>
                <div className="signInFormBottom">
                <Link to="/driver/registerdriver" className="signInSignup signInA">
                  Sign up
              </Link>
              </div>
              
                </div>
              </div>
            </div>
       
        );
  
      } else {
        return <Redirect to='/driver/' />
      }
    }
  }
  