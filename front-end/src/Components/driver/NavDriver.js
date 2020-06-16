import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import axios from'axios';
import Notification from "react-notifications-component";
import { faHouseUser,faBusAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { store } from "react-notifications-component";
export default class NavDriver extends React.Component {
  constructor() {
    super();
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

  render() {
    if(this.state.loggedIn){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="flex-column">
          <Notification />
          <Navbar.Brand href="/driver/" style={{fontWeight:700,fontSize:20}}>Transport Service <FontAwesomeIcon icon={faBusAlt}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/driver/" style={{fontSize:17}}><FontAwesomeIcon color="#b048d9" icon={faHouseUser}/></Nav.Link>
              <Nav.Link href="/driver/profile" style={{paddingLeft:'15px',fontSize:17}}>My Profile</Nav.Link>
              <Nav.Link href="/driver/lost" style={{paddingLeft:'15px',fontSize:17}}>Lost/Found</Nav.Link>
              <Nav.Link href="/driver/driverviewlost" style={{paddingLeft:'15px',fontSize:17}}>Driver View Lost</Nav.Link>
              <Nav.Link href="/driver/complain" style={{paddingLeft:'15px',fontSize:17}}>Have Complains?</Nav.Link>
              <Nav.Link href="/driver/myschedule" style={{paddingLeft:'15px',fontSize:17}}>My Schedule</Nav.Link>
              <Nav.Link href="/driver/studentchart" style={{paddingLeft:'15px',fontSize:17}}>Student Status</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link onClick={this.onClick} href="" style={{paddingLeft:'15px',fontSize:17}}>
                SignOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );

     }
     else{
      return <Redirect to="/driver/login" />
    }
   
  }
}
