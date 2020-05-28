import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import axios from 'axios';

 export default class PostNews extends React.Component{
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.verify = this.verify.bind(this);
        this.onChange = this.onChange.bind(this);
       
        this.state = {
          description:"",
        };
    
      }
      onChange(e){
        this.setState({ description: e.target.value });
      }
      
      onSubmit() {
        if (this.verify()) {
          
         var bodyParameters = {
          date:this.state.date,
          description: this.state.description

         };
          axios
            .post("/api/student/postnews",
            bodyParameters,
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
    if (this.state.description === "" || this.state.description <=10) {
      store.addNotification({
        title: "Error",
        message: "Description needs to be Descriptive",
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
      return false;
    }
    return true;
  }
    render(){
        return(
            <div style={{padding:10,marginTop:20}}>
                <Form>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Post News </Form.Label>
  </Form.Group>
   <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label >Type Any News</Form.Label>
    <Form.Control as="textarea" rows="5" onChange={this.onChange}/>
  </Form.Group>
</Form>
<Button type="submit" style={{textAlign:"center"}} onClick={this.onSubmit}> Post News

</Button>

            </div>
        );
    }

 }