import React from "react";
import { Form, Button,Col,Card } from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faRoute,faMale,faBus,faUserClock,faUserTimes,faClock,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class CreateSchedule extends React.Component {
    constructor(){
        super();
        this.getbuses=this.getbuses.bind(this);
        this.AssignSchedule=this.AssignSchedule.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.getdrivers=this.getdrivers.bind(this);
        this.handleDriverChange=this.handleDriverChange.bind(this);
        this.handleBusChange=this.handleBusChange.bind(this);
        this.state={
          routeId:1,
          uniBus:[],
          busNumber:'',
          drivers:[],
          driverId:'',
        }}

  UNSAFE_componentWillMount() {
    axios
    .get(
      "http://localhost:3000/api/admin/getAllDriversbyName")
    .then(response => {
        let drivers=[]
       response.data.drivers.forEach(element => {
           drivers.push(element);
       });
      this.setState({
       drivers:drivers,
       driverId:drivers[0]
      });
    })
    .catch(error => {
    });
    axios
    .get(
      "http://localhost:3000/api/admin/getAllBuses")
    .then(response => {
        let uniBus=[]
       response.data.uniBus.forEach(element => {
           uniBus.push(element);
       });
      this.setState({
       uniBus:uniBus,
       busNumber:uniBus[0]
      });
      console.log(uniBus[0]);
    })
    .catch(error => {
    });
  }
  getdrivers(){
    let options=[]
    this.state.drivers.forEach((element,index) => {
      console.log(element);
    options.push(<option key={index}>{element.firstName} {element.lastName} {element.cell}</option>)
    });
    return options;
    }
   getbuses(){
    let options=[]
    this.state.uniBus.forEach((element,index) => {
        options.push(<option key={index}>{element}</option>)
    });
    return options;
    }
    AssignSchedule(e){
      e.preventDefault();
      let startDate=new Date(this.state.startingDate+" "+this.state.startingTime);
      let endDate=new Date(this.state.endingDate);
      console.log(startDate.getFullYear())

      if(startDate.getTime()<endDate.getTime()){
        let config = {
          //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
          };
        let bodyParameters={schedule:{driverId:this.state.driverId,routeId:this.state.routeId,busNumber:this.state.busNumber,startingDate:startDate.toISOString(),endingDate:this.state.endingDate}}
    
        axios.post('http://localhost:3000/api/admin/createSchedule',bodyParameters,config)
      .then(()=>{
        store.addNotification({
          title: "Driver Schedule Assigned.",
          message: " ",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }).catch((err)=>{
        console.log(err);
          store.addNotification({
            title: "Not Assigned ",
            message: "Try again Later",
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
    
    handleChange(e){
      this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleBusChange(e){
      this.setState({
        [e.target.name]:e.target.value
    })
    console.log(this.state)
    }
    handleDriverChange(e){
      this.setState({
        driverId:this.state.drivers[e.target.selectedIndex].id
    })
    console.log("driver-id below");
    console.log(this.state.driverId);
    console.log('above');
    }
 
  render() {
    return (
      <Form  onSubmit={this.AssignSchedule}>
      <ReactNotification/>
      <h4 style={{color:'#33bf13',fontFamily:'cursive',fontSize:"27px"}}>Assign Driver a Schedule by filling the following details.</h4>
<br/>
<br/>

        <Form.Row>
          <Col>
            <Form.Group controlId="formGroupRoute">
              <Form.Label style={{fontSize:"22px"}}>Select Route <FontAwesomeIcon icon={faRoute} size='1x'/> </Form.Label>
              <Form.Control required name="routeId" onChange={this.handleChange} as="select" style={{height:'40px',width:'400px',fontFamily:'sans-serif'}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formGroupBus">
              <Form.Label style={{fontSize:"22px"}}>Select Drivers <FontAwesomeIcon icon={faMale}/></Form.Label>
              <Form.Control name="driverId" onChange={this.handleDriverChange} required as="select" placeholder="Select Bus" style={{height:'40px',width:'400px',fontFamily:'sans-serif'}}>
                {this.getdrivers()}
            </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formGroupBus">
              <Form.Label style={{fontSize:"22px"}}>Select Bus <FontAwesomeIcon icon={faBus}/></Form.Label>
              <Form.Control name="busNumber" onChange={this.handleBusChange} required as="select" placeholder="Select Bus" style={{height:'40px',width:'400px',fontFamily:'sans-serif'}}>
                {this.getbuses()}
            </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col >
            <Form.Group controlId="formGroupStartDate">
              <Form.Label style={{fontSize:"22px"}}>Plan Starting Date <FontAwesomeIcon icon={faUserClock}/></Form.Label>
              <Form.Control required name="startingDate" onChange={this.handleChange} type="date" />  
            </Form.Group>
          </Col>
          <Col >
            <Form.Group controlId="formGroupEndDate">
              <Form.Label style={{fontSize:"22px"}}>Plan End Date <FontAwesomeIcon icon={faUserTimes}/></Form.Label>
              <Form.Control required name="endingDate" onChange={this.handleChange} type="date" />  
            </Form.Group>
            </Col>
          <Col>
            <Form.Group controlId="formGroupStartingTime">
              <Form.Label style={{fontSize:"22px"}}>Plan Starting Time <FontAwesomeIcon icon={faClock}/></Form.Label>
              <Form.Control required name="startingTime" onChange={this.handleChange} type="time" />  
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row >
        <Button type="submit">Assign Schedule <FontAwesomeIcon icon={faCheck}/></Button>
        </Form.Row>
      </Form>
    
    )
  }
}
