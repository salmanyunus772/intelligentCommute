import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import axios from'axios';
import Notification from "react-notifications-component";

import { store } from "react-notifications-component";
import { faHouseUser,faBusAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NavbarTop extends React.Component {
  constructor() {
    super();
    this.Scan=this.Scan.bind(this);
    this.addcredit=this.addcredit.bind(this);

    this.state={
      loggedIn:true
    };
    this.onClick = this.onClick.bind(this);
  }
 componentWillUpdate(){
   if (!localStorage.getItem('token')){
     this.setState({
       loggedIn:true
     })
   }
 }
  onClick() {
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
  }
  Scan(){
    var config = {
         headers: { Authorization: "bearer " + localStorage.getItem("token") }
      };
  
      var bodyParameters = {
      };
      axios
        .post(
          "http://localhost:3000/api/student/attendance",
          bodyParameters,
          config
        )
        .then(response => {
          store.addNotification({
              title: "Success",
              message: "Balance Deducted",
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
          store.addNotification({
              title: "Error",
              message: "Not enough Balance",
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
  }
  addcredit(){
    var config = {
         headers: { Authorization: "bearer " + localStorage.getItem("token") }
      };
  
      var bodyParameters = {
      };
      axios
        .post(
          "http://localhost:3000/api/student/addCredit",
          bodyParameters,
          config
        )
        .then(response => {
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
          store.addNotification({
              title: "Error",
              message: "Balance not added",
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
  }
  

  render() {
    if(this.state.loggedIn){
      return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="flex-column">
          <Notification />
          <Navbar.Brand href="/student/" style={{fontWeight:700,fontSize:20}}>Transport Service <FontAwesomeIcon icon={faBusAlt}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="pills" className="mr-auto" defaultActiveKey="/home">
              <Nav.Link href="/student/" style={{fontSize:17}}><FontAwesomeIcon color="#b048d9" icon={faHouseUser}/></Nav.Link>
              <Nav.Link eventkey="track" href="/student/track" style={{paddingLeft:'15px',fontSize:17}}>Track Bus</Nav.Link>
              <Nav.Link href="/student/profile" style={{paddingLeft:'15px',fontSize:17}}>My Profile</Nav.Link>
              <Nav.Link href="/student/lost" style={{paddingLeft:'15px',fontSize:17}}>Lost/Found</Nav.Link>
              <Nav.Link href="/student/complain" style={{paddingLeft:'15px',fontSize:17}}>Have Complains?</Nav.Link>
              <Nav.Link href="/student/viewlost" style={{paddingLeft:'15px',fontSize:17}}>View lost</Nav.Link>
              
            </Nav>

            <Nav>
              <Nav.Link onClick={this.onClick} href="" style={{paddingLeft:'15px',fontSize:17}}>
              SignOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }else{
      return <Redirect to="/student/login" />
    }
   
  }
}
