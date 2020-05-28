import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faUserAltSlash,faUserTag,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class AdminRoutes extends React.Component {
    constructor(){
        super();
        this.state={
            regs:[],
            student:'',
            rfid:''
        }
        this.getStudents=this.getStudents.bind(this);
        
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        
    }
   
  UNSAFE_componentWillMount() {
    var config = {
    //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {};
    axios
      .get(
        "http://localhost:3000/api/admin/studentsWithoutRfid",
        bodyParameters,
        config
      )
      .then(response => {
         
          let regs=[]
         response.data.regs.forEach(element => {
             regs.push(element);
         });
        this.setState({
         regs:regs,
         student:regs[0]
        });
        console.log(regs[0]);
      })
      .catch(error => {
    
      });
  }
    getStudents(){
        let options=[]
        this.state.regs.forEach((element,index) => {
            options.push(<option key={index}>{element}</option>)
        });
        return options;
    }
    handleSubmit(e){
        e.preventDefault();
        var config = {
            //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
            };
        
            var bodyParameters = {
                reg:this.state.student,
                rfid:this.state.rfid
            };
            axios
              .post(
                "http://localhost:3000/api/admin/assignRfid",
                bodyParameters,
                config
              )
              .then(response => {
                store.addNotification({
                    title: "Success",
                    message: "RFID assigned",
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
              let t=this.state.regs;
              t.splice(t.indexOf(this.state.student),1);
            this.setState({
                regs:t
            })
            
            })
              .catch(error => {
                  console.log(error);
                store.addNotification({
                    title: "Error",
                    message: "try again",
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

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state)
    }


  render() {

    return (
     
        <Form onSubmit={this.handleSubmit}>
        <ReactNotification/>
          <Form.Group >
            <h4 style={{fontFamily:"Bookmen,serif"}}><Form.Label>Students Registration Number with Unassigned RFIDs <FontAwesomeIcon icon={faUserAltSlash}/></Form.Label></h4>
            <Form.Control style={{height:"40px"}} name="student" onChange={this.handleChange} required as="select" placeholder="Select Student" >
                {this.getStudents()}
            </Form.Control>
          </Form.Group>
          <Form.Group  >
           <h4 style={{fontFamily:"Bookmen,serif"}}><Form.Label>Assign RFID to Student <FontAwesomeIcon icon={faUserTag}/> </Form.Label></h4>
            <Form.Control name="rfid" onChange={this.handleChange} required type="text" placeholder="RFID" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Assign <FontAwesomeIcon icon={faCheck}/>
          </Button>
        </Form>
      
    );
  }
}
