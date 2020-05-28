import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { store } from "react-notifications-component";
import { faIdCard,faPhoneAlt,faMale,faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class driverProfile extends Component {
  constructor(){
    super();
    this.ContactUpdate=this.ContactUpdate.bind(this);
    this.onChangeContact=this.onChangeContact.bind(this);
    this.state={
        firstName:"",
        lastName:"",
        cell:0
    }
  }
  componentDidMount(){    
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
   };

   var bodyParameters = {
     firstName:this.state.firstName,
     lastName:this.state.lastName,
     cell:this.state.cell
   };
   axios
     .post(
       "http://localhost:3000/api/driver/viewProfile",
       bodyParameters,
       config
     )
     .then(response => {
      this.setState({
        firstName:response.data.firstName,
        lastName:response.data.lastName,
        cell:response.data.cell
    });
    }) 
     .catch(error => {
         console.log(error);
        
     });

  }
  onChangeContact(e){
    this.setState({ cell: e.target.value });
  }
  ContactUpdate(){
    if (this.state.cell.length < 11) {
      store.addNotification({
        title: "Error",
        message: "Valid Contact Required",
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
    else{
      
      alert(this.state.firstName+""+this.state.lastName+""+this.state.cell);
      var config = {
        headers: { Authorization: "bearer " + localStorage.getItem("token") }
     };
     var bodyParameters = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      cell:this.state.cell
    };
      axios
      .post("http://localhost:3000/api/driver/updatedrivercontact", 
        bodyParameters,config)
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

  render() {
    return (
      <div style={{ height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
       <h3 style={{fontFamily:'Georgia',fontWeight:'bold',fontSize:30,textAlign:'center',color:"#271470"}}><strong><i>Your Personal Details  <FontAwesomeIcon icon={faIdCard} size='1.5x' /></i></strong></h3>
      <Form>
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>First Name <FontAwesomeIcon icon={faMale} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.firstName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Last Name <FontAwesomeIcon icon={faMale} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.lastName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Phone Number <FontAwesomeIcon icon={faPhoneAlt} size='1.9x'/></Form.Label>
          <Form.Control
            type="number"
            placeholder={this.state.cell}
            onChange={this.onChangeContact}
        
          />
        </Form.Group>
        <Button variant="info" onClick={this.ContactUpdate}>Update Contact <FontAwesomeIcon icon={faUserEdit} size='1.9x'/></Button>
      </Form.Row>
    </Form>
  
      </div>
    );
   
  }
}
