import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import axios from 'axios';


 export default class ComplainResponse extends React.Component{
    constructor(props) {
        super(props);
        //this.reply=this.reply.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.verify = this.verify.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
          description:"",
          passt:""
        };
    
      }
      onChange(e){
        this.setState({ description: e.target.value });
      }
      componentDidMount(){
        this.setState({passt:this.props.pass});
        console.log('llllllllllllll')
        console.log(this.props.pass);
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
          description: this.state.description
         };
          axios
            .post("/api/student/complainresponse",
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
        console.log(this.state.passt);
        return(
            <div style={{padding:10,marginTop:20}}>
                <Form>

   <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label >FeedBack</Form.Label>
    <Form.Control as="textarea" rows="5" onChange={this.onChange} />
  </Form.Group>
</Form>
<Button type="submit" style={{textAlign:"center"}} onClick={this.onSubmit}> Submit Your Feeback

</Button>

            </div>
        );
    }

 }