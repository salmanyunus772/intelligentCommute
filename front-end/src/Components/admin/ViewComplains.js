import React, { useState } from "react";
import "../../Components/css/register.css";
import {Table,Button,Form, Nav, Modal}  from "react-bootstrap";
import { Router, Route, Link } from 'react-router-dom';
import { store } from "react-notifications-component";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { faExclamationTriangle,faCheckDouble, faReply,faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class ViewComplains extends React.Component{
    constructor(){
            
        super();
        this.respond=this.respond.bind(this);
        this.sendR=this.sendR.bind(this);
        this.state={ 
            _id:'',
            AdminResponse:'',
            complainArray:[] };
    }
             
    componentDidMount(){
        axios
        .get("/api/admin/viewcomplains")
        .then(response => {
            this.setState({ complainArray:response.data.complains})
        })
        .catch(err => {
          console.log(err);
        });
    }
    
    respond(e){
      this.setState({AdminResponse:e.target.value});
      
    }
    sendR(_id){
      if (this.state.AdminResponse.length>=10) {
       var bodyParameters = {
        AdminResponse:this.state.AdminResponse,
        _id:this.state._id
       };
        axios
          .post("/api/admin/complainresponse",
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
     else{
      store.addNotification({
        title: "Error",
        message: "Response Should be Descriptive",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
  })
     }
    }
  
    
    createTable = () => {
        if (this.state.complainArray === []) {
          return {};
        } else {
           let table = [];
          this.state.complainArray.forEach((element, key) => {
          table.push(
          <tr key={key}>
          <td>{key + 1}</td>
          <td>{element.from}</td>
          <td>{element.date}</td>
          <td>{element.type}</td>
          <td >{element.description}</td>
          <td>    
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>{
             this.setState({_id:this.state.complainArray[key].id})
            }}>
                Reply <FontAwesomeIcon icon={faReply}/>
              </button>
              </td>
         </tr>
          );
          });
          return table;
        }
      };

createModal=()=>{
return(
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div style={{paddingTop:50}} className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel"><strong>Respond To Student </strong></h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <Form.Control as="textarea" rows="3" onChange={this.respond}/>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={()=>{this.sendR(this.state._id)}}>Send Response <FontAwesomeIcon icon={faReplyAll}/></button>
                    </div>
                  </div>
                </div>
              </div> 
);

}

    render(){
        return(
            <div>
            <ReactNotification />
            <Table responsive>
              <thead style={{backgroundColor:'#363970'}}>
                <tr>
                  <th style={{color:'white'}}>#</th>
                  <th style={{color:'white'}}>From</th>
                  <th style={{color:'white'}}>Date</th>
                  <th style={{color:'white'}}>Type</th>
                  <th style={{color:'white'}}>Description</th>
                  <th style={{color:'white'}}>Response
                  </th>
                </tr>
              </thead>
              <tbody>{this.createTable()}
                     {this.createModal()}
              
              </tbody>
            </Table>
          </div>
        );
    }
}