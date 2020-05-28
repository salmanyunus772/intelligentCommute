import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import "react-notifications-component/dist/theme.css";
import ReactNotification, { store } from "react-notifications-component";
import axios from 'axios';
import { faClipboardList,faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import board from "./noticeboard.jpg";
import { urlencoded } from 'body-parser';

export default class PostNews extends React.Component{
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.verify = this.verify.bind(this);
        this.onChange = this.onChange.bind(this);
        this.notify = this.notify.bind(this);

        this.state = {
          news:""
        };
    
      }

      notify(message, type) {
        console.log(message + " " + type);
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

      onChange(e){
        this.setState({ news: e.target.value });
      }

      onSubmit() {
        if (this.verify()) {
          var config = {
            headers: { Authorization: "bearer " + localStorage.getItem("token") }
         };
         var bodyParameters = {
          date:this.state.date,
          news: this.state.news
         };
         axios
         .post("/api/admin/postNews",
         bodyParameters,
         config) 
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
    }
   }
       
  verify() {
    if (this.state.news === "" || this.state.news.length<=12) {
      this.notify("News should be descriptive", "danger");
      return false;
    }
    return true;
  }
    render(){
        return(
            <div style={{padding:10,marginTop:20,backgroundImage:`url(${board})`}}>
                <Form>
   <Form.Group controlId="exampleForm.ControlTextarea1">
   
    <Form.Label style={{fontFamily:'cursive',fontSize:"35px"}}> Post News Online <FontAwesomeIcon color="#b048d9" icon={faClipboardList}/></Form.Label>
    <Form.Control as="textarea" rows="5" onChange={this.onChange}/>
  </Form.Group>
</Form>

<Button type="submit" style={{textAlign:"center"}} onClick={this.onSubmit}> Pin On Noticeboard <FontAwesomeIcon icon={faThumbtack}/>

<ReactNotification />
</Button>



            </div>
        );
    }

 }