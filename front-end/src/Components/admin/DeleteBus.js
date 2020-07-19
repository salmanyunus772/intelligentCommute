import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
export default class DeleteBus extends React.Component {
    constructor(){
        super();
        this.state={
            uniBus:[],
            busnumber:'',
        }
        this.getbuses=this.getbuses.bind(this);
        
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
        // http://localhost:3000
        "/api/admin/getAllBuses",
        bodyParameters,
        config
      )
      .then(response => {
          let uniBus=[]
         response.data.uniBus.forEach(element => {
             uniBus.push(element);
         });
        this.setState({
         uniBus:uniBus,
         busnumber:uniBus[0]
        });
        console.log(uniBus[0]);
      })
      .catch(error => {
    
      });
  }
    getbuses(){
        let options=[]
        this.state.uniBus.forEach((element,index) => {
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
                number:this.state.busnumber,
            };
            axios
              .post(
                // http://localhost:3000
                "/api/admin/deleteBus",
                bodyParameters,
                config
              )
              .then(response => {
                store.addNotification({
                    title: "Success",
                    message:response.data.message,
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
              let t=this.state.uniBus;
              t.splice(t.indexOf(this.state.busnumber),1);
            this.setState({
                uniBus:t
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
            <Form.Label>Registered Buses</Form.Label>
            <Form.Control name="busnumber" onChange={this.handleChange} required as="select" placeholder="Select Bus" >
                {this.getbuses()}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Remove Bus 🚌
          </Button>
        </Form>
      
    );
  }
}
