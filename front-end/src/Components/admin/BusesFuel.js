import React from "react";
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faGasPump, faFillDrip,faBus,faMoneyBill,faCalendarAlt,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class BusesFuel extends React.Component {
    constructor(){
        super();
    this.handleBusChange=this.handleBusChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.OnchangeCost=this.OnchangeCost.bind(this);
    this.OnchangeLitres=this.OnchangeLitres.bind(this);
    this.OnSubmit=this.OnSubmit.bind(this);
    this.getbuses=this.getbuses.bind(this);
    this.state={
            uniBus:[],
            fuelinLitres:0,
            fuelinPrice:0,
            busNumber:"",
    }
}
UNSAFE_componentWillMount() {
    axios.get(
      // http://localhost:3000
    "/api/admin/getAllBuses")
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
getbuses(){
    let options=[]
    this.state.uniBus.forEach((element,index) => {
        options.push(<option key={index}>{element}</option>)
    });
    return options;
    }
    OnchangeCost(e){
        this.setState({
            fuelinPrice:e.target.value });
    }
    OnchangeLitres(e){
        this.setState({
            fuelinLitres:e.target.value });
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
}
OnSubmit(){
    let fillingDate=new Date(this.state.fillingDate);
    var bodyParameters = {
    fuelRecord:{
        busNumber:this.state.busNumber,
        fuelinLitres:this.state.fuelinLitres,
        fuelinPrice:this.state.fuelinPrice,
        fillingDate:this.state.fillingDate
    }
};
// http://localhost:3000
    axios.post('/api/admin/busFuelAdd',bodyParameters)
    .then(()=>{
      store.addNotification({
        title: "Fuel Record Saved",
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
          title: "Fuel Record Saved ",
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

render(){
    return(
        <div> 
        <Form>
        <ReactNotification/>
        <h4 style={{color:'#180bb0',fontFamily:'cursive',fontSize:"35px",textAlign:'center'}}>Buses Fuel Consumption Logs <FontAwesomeIcon icon={faGasPump}/></h4>
  <br/>
        <Form.Group controlId="formGroupBus">
              <Form.Label style={{fontSize:"18px"}}>Select Bus <FontAwesomeIcon icon={faBus}/></Form.Label>
              <Form.Control name="busNumber" onChange={this.handleBusChange} required as="select" placeholder="Select Bus" style={{height:'40px'}}>
                {this.getbuses()}
            </Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label style={{fontSize:"18px"}}>Quantity in Litres <FontAwesomeIcon icon={faFillDrip}/></Form.Label>
            <Form.Control onChange={this.OnchangeLitres} required type="number" placeholder="12.25" >
            </Form.Control>
            <Form.Group>
            <Form.Label style={{fontSize:"18px"}}>Total Cost <FontAwesomeIcon icon={faMoneyBill}/></Form.Label>
            <Form.Control onChange={this.OnchangeCost} required type="number" placeholder="4000" >
            </Form.Control>
          </Form.Group>
          </Form.Group>
          
          <Form.Group controlId="formGroupStartDate">
              <Form.Label style={{fontSize:"18px"}}>Filling Date <FontAwesomeIcon icon={faCalendarAlt}/></Form.Label>
              <Form.Control required name="fillingDate" required onChange={this.handleChange} type="date" />  
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit" onClick={this.OnSubmit} style={{fontSize:"18px"}}>Save Fuel Record <FontAwesomeIcon icon={faCheck}/></Button>
          </div>
    )}
}