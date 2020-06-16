import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import { faHouseUser, faBusAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AdminNavbarTop extends React.Component {
  constructor() {
    super();

    this.state={
      loggedIn:true
    };
    this.onClick = this.onClick.bind(this);
  }
  UNSAFE_componentWillUpdate(){
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
          <Navbar.Brand href="/admin/" style={{fontWeight:700,fontSize:20}}>Transport Service <FontAwesomeIcon icon={faBusAlt}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/admin/" style={{fontSize:17}}><FontAwesomeIcon color="#b048d9" icon={faHouseUser}/></Nav.Link>
              <Nav.Link href="/admin/trackfleet" style={{fontSize:15}}>TrackFleet</Nav.Link>
              <Nav.Link href="/admin/postnews" style={{fontSize:15}}>PostNews</Nav.Link>
              <Nav.Link href="/admin/assignrfid" style={{fontSize:15}}>AssignRFID</Nav.Link>
              <Nav.Link href="/admin/extendservice" style={{fontSize:15}}>StudentStatus</Nav.Link>
              <Nav.Link href="/admin/charts" style={{fontSize:15}}>Charts</Nav.Link>
              <Nav.Link href="/admin/routeAssign" style={{fontSize:15}}>Routes</Nav.Link>
              <Nav.Link href="/admin/confirmstudents" style={{fontSize:15}}>ConfirmStudents</Nav.Link>
              <Nav.Link href="/admin/viewstudentcomplains" style={{fontSize:15}}>StudentComplains</Nav.Link>
              <Nav.Link href="/admin/createSchedule" style={{fontSize:15}}>DriverScheduling</Nav.Link>
              <Nav.Link href="/admin/drivercomplains" style={{fontSize:15}}>DriverComplains</Nav.Link>
              <Nav.Link href="/admin/regbus" style={{fontSize:15}}>AddBus </Nav.Link>
              <Nav.Link href="/admin/busView" style={{fontSize:15}}>ViewBuses </Nav.Link>
              <Nav.Link href="/admin/busFuel" style={{fontSize:15}}>BusesFuel </Nav.Link>
              {/* <Nav.Link href="/admin/viewplan" style={{fontSize:15}}>BusesPlans</Nav.Link>
              <Nav.Link href="/admin/createplan" style={{fontSize:15}}>MakePlan</Nav.Link> */}
                 <Nav.Link onClick={this.onClick} href="" style={{fontSize:15}}>
                SignOut
              </Nav.Link>
            </Nav>
            {/* <Nav style={{paddingLeft:"35px"}}>
            
            </Nav> */}
          </Navbar.Collapse>
        </Navbar>
      );
    }else{
      return <Redirect to="/admin/login" />
    }
  }
}
