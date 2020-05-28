
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

 export default class UploadImage extends React.Component{
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeimg=this.onChangeimg.bind(this);
    
        this.state = {
          img:""
        };
    
      }
      onChangeimg(e){
        this.setState({ img: e.target.value });
      }
      onSubmit() {
     
         var bodyParameters = {
          img: this.state.img
         };
          // axios
          //   .post("/api/student/uploadimg",
          //   bodyParameters
          //   ) 
          axios
            .get("/api/student/viewimg",
            bodyParameters
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

    


    render(){
    return(
        <div style={{padding:10,marginTop:20}}>
            <Form>
<Form.Label>Upload Picture </Form.Label>
<p> <input type='file' name="foo" id="lost" onChange={this.onChangeimg}/></p>
</Form>
<Button type="submit" style={{textAlign:"center"}} onClick={this.onSubmit}> Upload Image
</Button>
</div>
    );
}

}