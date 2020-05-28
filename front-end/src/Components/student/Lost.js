import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faSearch,faStream,faCommentDots,faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 export default class Lost extends React.Component{
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.verify = this.verify.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeType=this.onChangeType.bind(this);
    this.onChangeimg=this.onChangeimg.bind(this);
    this.state = {
      type: "lost",
      description:"",
      img:"",
      responses:"",
    };

  }
  onChange(e){
    this.setState({ description: e.target.value });
  }
  onChangeType(e){
    this.setState({ type: e.target.value });
  }
  onChangeimg(e){
    this.setState({ img: e.target.value });
  }
  
  onSubmit() {
    if (this.verify()) {
      var config = {
        headers: { Authorization: "bearer " + localStorage.getItem("token") }
     };
     var bodyParameters = {
      from:this.state.from,
      date:this.state.date,
      type: this.state.type,
      description: this.state.description,
      img: this.state.img,
      responses:this.state.responses
     };
      axios
        .post("/api/student/lost",
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
               message: "Not Posted",
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
if (this.state.description === "") {
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
                <h3 style={{fontFamily:'Georgia'}}><strong>Report Lost or Found Items <FontAwesomeIcon icon={faSearch} color='red' size='1.9x'/></strong></h3>
  <Form.Group controlId="exampleForm.ControlSelect1">
  <Form.Label><h4><strong>Select Your Type </strong>< FontAwesomeIcon icon={faStream}/></h4> </Form.Label>
    <Form.Control as="select" onChange={this.onChangeType} style={{height:'40px',width:'750px',fontFamily:'sans-serif'}} >
      <option>Lost</option>
      <option>Found</option>
       </Form.Control>
  </Form.Group>
  
   <Form.Group controlId="exampleForm.ControlTextarea1">
   <Form.Label> <h4><strong>Description of Lost Found Item </strong> <FontAwesomeIcon icon={faCommentDots}/></h4> </Form.Label>
    <Form.Control as="textarea" rows="5" onChange={this.onChange} style={{width:'850px'}}/>
  </Form.Group>
  <Form.Label> <h4><strong>Upload Item Picture </strong> <FontAwesomeIcon icon={faImage}/></h4> </Form.Label>
  <p> <input type='file' id="lost" onChange={this.onChangeimg}/></p>
</Form>
<br/>
<Button type="submit" style={{textAlign:"center"}} onClick={this.onSubmit}> Post Lost or Found
</Button>
</div>
        );
    }

 }