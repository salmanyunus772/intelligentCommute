import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import "react-notifications-component/dist/theme.css";
import ReactNotification, { store } from "react-notifications-component";
import axios from 'axios';

export default class ExpiredStudent extends React.Component{

    render(){
        return(
            <div>
              <br/>
              <br/>
              <div id="noticeBoard" style={{marginLeft:"27%", borderRadius:"2%", borderStyle:"solid", borderWidth:"thick", borderColor:"black", width:"50%", backgroundColor:"lightgrey"}}>
              <center><p style={{fontSize:"35px", color:"black"}}><i style={{marginTop:"10px"}} class="glyphicon glyphicon-warning-sign"></i> EXPIRED!</p></center>
                <center><h1>Your account is expired now. Re-newal required!</h1></center>
              </div>
            </div>
        );
    }

 }