import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import axios from 'axios';
import { faEnvelopeOpen,faStream,faCommentDots,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 export default class DriverComplain extends React.Component{
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.verify = this.verify.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
          description:"",
          AdminCompResponse:""
        };
    
      }
      onChange(e){
        this.setState({ description: e.target.value });
      }
      onSubmit() {
        if (this.verify()) {
          var config = {
            headers: { Authorization: "bearer " + localStorage.getItem("token") }
         };
         var bodyParameters = {
          from:this.state.from,
          date:this.state.date,
          description: this.state.description,
          AdminCompResponse:this.state.AdminCompResponse
         };
          axios
            .post("/api/driver/complain",
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
    if (this.state.description === "" || this.state.description.length<=10) {
      store.addNotification({
        title: "Error",
        message: "Description cannot be Empty",
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
                <h3 style={{fontFamily:'Georgia'}}><strong>Driver Complain Form <FontAwesomeIcon icon={faEnvelopeOpen} color='#14c414' size='1.9x'/></strong></h3>
                  <h4 style={{color:'#180bb0',fontFamily:'cursive'}}>Please Fill the Form with the relevant complaint. Admin will review your complain and will response back as soon as possible.</h4>

   <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label> <h4><strong>Write Your Feedback </strong> <FontAwesomeIcon icon={faCommentDots}/></h4> </Form.Label>
   <Form.Control as="textarea" rows="5" style={{width:'850px'}} onChange={this.onChange}/>
  </Form.Group>
</Form>
<Button type="submit" onClick={this.onSubmit}> Post to Admin <FontAwesomeIcon icon={faPaperPlane}/>

</Button>

            </div>
        );
    }

 }