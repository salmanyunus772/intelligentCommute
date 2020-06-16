import React from "react";
import "./css/register.css";
import {Button,Table,Form }  from "react-bootstrap";
import axios from "axios";
import Loading from "./Loadingdriver";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import Img from 'react-image';
import { faTrashAlt,faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default class DriverViewlost extends React.Component{
    constructor(){
        super();
        this.DeletePost=this.DeletePost.bind(this);
        this.respond=this.respond.bind(this);
        this.sendR=this.sendR.bind(this);
        this.state={ 
            _id:'',
            contact:'',
            LostFoundResponse:'',
            lostfoundArray:[] };
    }          
    componentDidMount(){
      var config = {
        headers: { Authorization: "bearer " + localStorage.getItem("token") }
     };
     var bodyParameters = {
    };
        axios
        .post("/api/driver/viewlostbydriver",bodyParameters,config)
        .then(response => {
            console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',response)
             this.setState({ lostfoundArray:response.data.findlostitem})
             this.setState({contact:response.data.regis_no})
        })
        .catch(err => {
          console.log(err);
        });
    }
    respond(e){
      this.setState({LostFoundResponse:e.target.value});
      
    }
    sendR(_id){
      if (this.state.LostFoundResponse.length>=10) {
       var bodyParameters = {
        LostFoundResponse:this.state.LostFoundResponse,
        _id:this.state._id,
        contact:this.state.contact
       };
        axios
          .post("/api/driver/driverlostfoundresponse",
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
    DeletePost(idDel){
      var bodyParameters = {
        _id:idDel
       };
        axios
          .post("/api/driver/driverdeleteyourlostfoundresponse",
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
                 message: "Cannot Delete Right Now",
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
    createTable = () => {
        if (this.state.lostfoundArray === []) {
          return {};
        } else {
          let table = [];
          //console.log(this.state.lostfoundArray);
          this.state.lostfoundArray.forEach((element, key) => {
            if(element.from===this.state.stdreg){
            table.push(
              <tr key={key}>                
                <td>{key + 1}</td>
                <td>{element.from}</td>
                <td>{element.date}</td>
                <td>{element.type}</td>
                <td >{element.description}</td> 
                <td><Img src={`http://localhost:3001/image/${element.img}`} style={{width:'150px',height:'150px'}}/></td>
                <td></td>
                {/* <td>    
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>{
             this.setState({_id:this.state.lostfoundArray[key].id})
            }}>
                Reply <FontAwesomeIcon icon={faReply}/>
              </button>
              </td> */}
                <td><Button  className="btn btn-danger" onClick={()=>{this.DeletePost(this.state.lostfoundArray[key].id)}}>Delete <FontAwesomeIcon icon={faTrashAlt}/></Button></td>
              </tr>
            );
            }
            else{
              table.push(
                <tr key={key}>                
                  <td>{key + 1}</td>
                  <td>{element.from}</td>
                  <td>{element.date}</td>
                  <td>{element.type}</td>
                  <td >{element.description}</td> 
                  <td><Img src={`http://localhost:3001/image/${element.img}`} style={{width:'150px',height:'150px'}}/></td>
                  {/* <td><Img src="http://localhost:3001/image/bus.png"/></td> */}
                  <td>    
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>{
             this.setState({_id:this.state.lostfoundArray[key].id})
             
            }}>
                Reply <FontAwesomeIcon icon={faReply}/>
              </button>
              </td>
                </tr>
              );

            }
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
                              <h5 className="modal-title" id="exampleModalLabel"><strong>Respond To Lost Found Post</strong></h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            <Form.Control as="textarea" rows="3" onChange={this.respond}/>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary" onClick={()=>{this.sendR(this.state._id)}}>Send Response</button>
                            </div>
                          </div>
                        </div>
                      </div> 
        );
        }
    render(){
        return(
            <div>
           <Table responsive>
              <thead style={{backgroundColor:'#363970'}}>
                <tr>
                  <th style={{color:'white'}}>#</th>
                  <th style={{color:'white'}}>From</th>
                  <th style={{color:'white'}}>Date</th>
                  <th style={{color:'white'}}>Type</th>
                  <th style={{color:'white'}}>Description</th>
                  <th style={{color:'white'}}>Image</th>
                  <th style={{color:'white'}}>Response</th>
                  <th style={{maxWidth:30,color:'white'}}>Delete own Post</th>
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