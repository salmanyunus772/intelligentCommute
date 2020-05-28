import React from "react";
import { Form, Button,Col,Card } from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faRoute, faMale,faBus,faClock,faCalendarAlt,faCheck, faTimes, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class CreatePlan extends React.Component {
    constructor(){
        super();
        this.getbuses=this.getbuses.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.getdrivers=this.getdrivers.bind(this);
        this.handleBusChange=this.handleBusChange.bind(this);
        this.handleDriverChange=this.handleDriverChange.bind(this);
        this.state={
          driverId:1,
          busNumber:1,
          routeId:1,
          planDays:[],
          uniBus:[],
          busnumber:'',
          drivers:[],
          busdrivername:'',
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
       busdrivername:drivers[0]
      });
      // console.log(drivers[0]);
    })
    .catch(error => {
      console.log(error);
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
       busnumber:uniBus[0]
      });
    })
    .catch(error => {
  
    });
  }
  
  getdrivers(){
    let options=[]
    this.state.drivers.forEach((element,index) => {
      // console.log(element);
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
    handleSubmit(e){
      alert('u pressed button')
      e.preventDefault();
      //if(this.state.mon ||this.state.tue ||this.state.wed ||this.state.thu ||this.state.fri ||this.state.sat ||this.state.sun){
        let startDate=new Date(this.state.startingDate+" "+this.state.startingTime);
        let endDate=new Date(this.state.endingDate);
        
        //console.log(startDate.getFullYear())
        console.log('start date=====',startDate)
        console.log('ending date========',endDate)
        if(startDate.getTime()<endDate.getTime()){
        let config = {
          //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
          };
          console.log('driver id is above');
          console.log(this.state.driverId)
        let bodyParameters={plan:{ driverId:this.state.driverId,routeId:this.state.routeId,busNumber:this.state.busNumber,startingDate:startDate,endingDate:this.state.endingDate,planDays:this.state.planDays}}
      axios.post('http://localhost:3000/api/admin/createPlan',bodyParameters,config)
      .then(()=>{
        store.addNotification({
          title: "Plan Saved",
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
            title: "Plan not saved",
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
    }}
    // else{
    //   alert('error')
    // }
    //}}
    componentWillMount(){
      
    }
    handleChange(e){
      if(e.target.name === "mon" ||e.target.name === "tue" ||e.target.name === "wed" ||e.target.name === "thu" ||e.target.name === "wed" ||e.target.name === "tue" ||e.target.name === "sun" ){
        this.setState({
          planDays:[...this.state.planDays ,e.target.name]
        })
        console.log('always...........')
        console.log(this.state.planDays)
      }else{
        this.setState({
            [e.target.name]:e.target.value
        })
      }
        // console.log(this.state);
    }
    handleBusChange(e){
      this.setState({
        [e.target.name]:e.target.value
    })
    // console.log(this.state)
    }
    handleDriverChange(e){
      this.setState({
        [e.target.name]:e.target.value
    })
    // console.log(this.state)
    }

  render() {

    return (
      // onSubmit={this.handleSubmit}
      <Form onSubmit={this.handleSubmit}>
      <ReactNotification/>
        <Form.Row>
          <Col>
            <Form.Group controlId="formGroupRoute">
              <Form.Label style={{fontSize:"18px"}}>Select Route <FontAwesomeIcon icon={faRoute} size='1x'/></Form.Label>
              <Form.Control required name="routeId" onChange={this.handleChange} as="select" style={{height:'30px'}}>
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
              <Form.Label style={{fontSize:"18px"}}>Select Driver <FontAwesomeIcon icon={faMale} size='1x'/></Form.Label>
              <Form.Control name="busdrivername" onChange={this.handleDriverChange} required as="select" placeholder="Select Bus" style={{height:'30px'}}>
                {this.getdrivers()}
            </Form.Control>
            </Form.Group>
          </Col>


          <Col>
            <Form.Group controlId="formGroupBus">
              <Form.Label style={{fontSize:'18px'}}>Select Bus <FontAwesomeIcon icon={faBus} size='1x'/></Form.Label>
              <Form.Control name="busnumber" onChange={this.handleBusChange} required as="select" placeholder="Select Bus" style={{height:'30px'}}>
                {this.getbuses()}
            </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <div>map</div>
              </Card.Body>
            </Card>
          </Col>
          <Col >
            <Form.Group controlId="formGroupStartDate">
              <Form.Label style={{fontSize:'18px'}}>Plan Starting Date <FontAwesomeIcon icon={faCalendarAlt} size='1x'/></Form.Label>
              <Form.Control required name="startingDate" onChange={this.handleChange} type="date" />  
            </Form.Group>
          </Col>
          <Col >
            <Form.Group controlId="formGroupEndDate">
              <Form.Label style={{fontSize:'18px'}}>Plan End Date <FontAwesomeIcon icon={faCalendarAlt} size='1x'/></Form.Label>
              <Form.Control required name="endingDate" onChange={this.handleChange} type="date" />  
            </Form.Group>
            </Col>
          <Col>
            <Form.Group controlId="formGroupStartingTime">
              <Form.Label style={{fontSize:'18px'}}>Plan Starting Time <FontAwesomeIcon icon={faClock} size='1x'/></Form.Label>
              <Form.Control required name="startingTime" onChange={this.handleChange} type="time" />  
            </Form.Group>
          </Col>


        </Form.Row>
        <Form.Row>
          <Form.Label style={{fontSize:'18px'}}>Plan Days <FontAwesomeIcon icon={faCalendarDay} size='1x'/></Form.Label>
        </Form.Row>
        <Form.Row>

          <Col>
          <Form.Group md="3" required  id="formGridCheckbox" style={{fontSize:'15px'}}>
            <Form.Check inline name="mon" type="checkbox" onChange={this.handleChange} label="Monday" />
            <Form.Check inline name="tue" type="checkbox" onChange={this.handleChange} label="Tuesday" />
            <Form.Check inline name="wed" type="checkbox" onChange={this.handleChange} label="Wednesday" />
            <Form.Check inline name="thu" type="checkbox" onChange={this.handleChange} label="Thursday" />
            <Form.Check inline name="fri" type="checkbox" onChange={this.handleChange} label="Friday" />
            <Form.Check inline name="sat" type="checkbox" onChange={this.handleChange} label="Saturday" />
            <Form.Check inline name="sun" type="checkbox" onChange={this.handleChange} label="Sunday" />
          </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm="4">
            <Button type="submit">Save plan <FontAwesomeIcon icon={faCheck} size='1x'/></Button>
          </Col>
        </Form.Row>
      </Form>
    
    )
  }
}
