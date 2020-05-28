import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Jumbotron } from './Components/Jumbotron';
import styled from 'styled-components';
import NewsBoard from './Components/admin/NewsBoard';
import {Redirect} from 'react-router-dom';
import Link from 'react-router-dom';
import NavbarTop from "./Components/student/homeComponents/Nav";
import Notifications from "./Components/student/homeComponents/Notifications";

const Styles = styled.div`
    #noticeBoard p {
        color : green;
        font-weight : bold;
        margin-left:2%; 
        font-size: 20px;
    }    
    
`;

export default class Register extends React.Component {  

  constructor(){
    super();
    this.onClickStudent = this.onClickStudent.bind(this);
    this.onClickDriver = this.onClickDriver.bind(this);
    this.onClickAdmin = this.onClickAdmin.bind(this);
    this.state={
      redirectStudent : false,
      redirectDriver : false,
      redirectAdmin : false
    };
  }

  onClickStudent(){
      this.setState({redirectStudent:true})
  }

  onClickDriver(){
    this.setState({redirectDriver:true})
  }

  onClickAdmin(){
    this.setState({redirectAdmin:true})
  }

  render() {
  if(this.state.redirectStudent){
    return <Redirect to="/student/login" />
  } 
 else if(this.state.redirectDriver){
   return <Redirect to="/driver/login" />
  } 
  else if(this.state.redirectAdmin){
    return <Redirect to="/admin/login" />
  }
  else{
    return (
      <div className="landingPageContainer">
         <Jumbotron />
          <div style={{maxWidth:"100%", marginTop:"35%"}} id="content">
          <b><p style={{fontSize:"50px",color:"blue", textAlign:"center", marginTop:"-35%"}}></p></b>
          <center><p style={{fontSize:"35px",color:"red"}}>A Bus Portal for Students, Drivers and Admin</p></center>
          <NewsBoard />
          <br/>
          <center>
          <button onClick={this.onClickStudent} className="button" style={{border:"none", height: "200px", width: "200px", marginLeft:"0px", fontSize:"30px", backgroundColor:"blue", borderRadius : "50%", color:"white"}}><span style={{color:"white"}} class="glyphicon glyphicon-user"></span><br/><span id="onHover">Students</span></button>
          <button onClick={this.onClickDriver}className="button" style={{border:"none", height: "200px", width: "200px", marginLeft:"60px", fontSize:"30px", backgroundColor:"blue", borderRadius : "50%", color:"white"}}><span style={{color:"white"}} class="glyphicon glyphicon-user"></span><br/><span id="onHover">Drivers</span></button>
          <button onClick={this.onClickAdmin} className="button" style={{border:"none", height: "200px", width: "200px", marginLeft:"60px", fontSize:"30px", backgroundColor:"blue", borderRadius : "50%", color:"white"}}><span style={{color:"white"}} class="glyphicon glyphicon-user"></span><br/><span id="onHover">Admin</span></button>
          </center>
          <br></br>
        </div>   
      </div>
    );
  }   

  }
}