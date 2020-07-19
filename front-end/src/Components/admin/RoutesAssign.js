
import "../css/register.css";
import React, { Component } from 'react';
import { Form, Button, Col,Row} from "react-bootstrap";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import axios from 'axios';
import { faChevronRight,faRoute,faBus,faRoad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class RoutesAssign extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.AssignBus=this.AssignBus.bind(this);
        this.handleBusChange=this.handleBusChange.bind(this);
        this.handleRouteChange=this.handleRouteChange.bind(this);
        this.onChangeStops = this.onChangeStops.bind(this);
        this.onChangeId = this.onChangeId.bind(this);   
        this.state = {
          id:"",
          stop:"",
          uniBus:[],
          busNumber:"",
          route_ids:[],
          route_id:""
        };
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

    axios.get(
      // http://localhost:3000
      "/api/admin/getAllRoutes")
    .then(response => {
      console.log('these are the routes id');
      console.log(response);
        let route_ids=[]
       response.data.route_ids.forEach(element => {
           route_ids.push(element);
       });
      this.setState({
       route_ids:route_ids,
       route_id:route_ids[0]
      });
      console.log(route_ids[0]);
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
      getroutes(){
        let options2=[]
        this.state.route_ids.forEach((element,index) => {
            options2.push(<option key={index}>{element}</option>)
        });
        return options2;
        }
  
    onChangeId(e){
        this.setState({ id: e.target.value });
      }
      onChangeStops(e){
        this.setState({ stop: e.target.value });
      }
      handleBusChange(e){
        this.setState({
          [e.target.name]:e.target.value
      })
    }
    handleRouteChange(e){
      this.setState({
        [e.target.name]:e.target.value
    })
  }
      onSubmit(){
            var bodyParameters = {
             id:this.state.id,
             stop: this.state.stop
            };
             axios
               .post("/api/admin/route_ASSIGN",
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
                      message: "Not Assigned",
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
          AssignBus(){
            var bodyParameters = {
              route_id:this.state.route_id,
              busNumber: this.state.busNumber
             };
              axios
                .post("/api/admin/assignRouteToBus",
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
                       message: "Not Assigned",
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
      
  render() {
    return (
        <div>
          <ReactNotification/>
          <Form>
          <Form.Row>
            <Form.Group as={Col} md="4">
             <h2><strong style={{fontFamily:'New Century Schoolbook, serif;',color:"#33339c"}}>Assign Stops to a Route  </strong><FontAwesomeIcon icon={faRoad} color="#33339c" /></h2>
                <h3 style={{fontFamily:"Zapf Chancery, cursive;"}}><label className="registerLabel"> Select Your Route</label> </h3>
                <select className="registerInput registerInputText registerSelect" name="route" id="routeid" onChange={this.onChangeId}  >
                  <option value="1" className="registerOption "> 1 </option>
                  <option value="2" className="registerOption ">2 </option>
                  <option value="3" className="registerOption ">3 </option>
                  <option value="4" className="registerOption "> 4 </option>
                  <option value="5" className="registerOption "> 5 </option>
                  <option value="6" className="registerOption "> 6 </option>
                </select>
                </Form.Group>
           <Form.Group as={Col} md="4">
             <div style={{paddingTop:52}}>
               <h3><label className="registerLabel">Select Stops</label> </h3>
               <select className="registerInput registerInputText registerSelect" name="stop" id="stopnbr" onChange={this.onChangeStops}  >
                <option value="Saddar, Rawalpindi" className="registerOption "> Saddar </option>
                <option value="6th Road, Rawalpindi" className="registerOption"> 6th Road </option>
                <option value="I.J.P. Road, Islamabad" className="registerOption"> IJP Road </option>
                <option value="chandni chowk murree road rawalpindi" className="registerOption"> Chandni Chowk </option>
                <option value="Committee Chowk Stop, Rawalpindi" className="registerOption"> Committee Chowk </option>
                <option value="Rehmanabad" className="registerOption"> Rehmanabad </option>
                <option value="Waris Khan, Rawalpindi" className="registerOption"> Waris Khan </option>
                <option value="Liaquat Bagh, Rawalpindi" className="registerOption"> Liaquat Bagh </option>
                <option value="I-10/4, Islamabad" className="registerOption ">I 10/4 Islamabad </option>
                <option value="Pirwadhai, Rawalpindi" className="registerOption">Pirwadhai</option>
            </select>
            </div>
            </Form.Group>

            </Form.Row>
            </Form>
            <button style={{marginTop:30,width:200,marginLeft:280}} type="submit"  className="signInSubmit signInInput" onClick={this.onSubmit}>Assign Stops</button>
<div style={{marginTop:55}}>
  <h3><strong style={{color:"#33339c"}}>Assign Route to Bus</strong></h3>
   <Form>
      <Form.Row>
        <Form.Group controlId="formGroupBus" as={Col} md="4">
            <h4><strong><Form.Label >Select Bus <FontAwesomeIcon icon={faBus}/></Form.Label></strong></h4>
            <Form.Control name="busNumber" onChange={this.handleBusChange} required as="select" placeholder="Select Bus" style={{height:'40px',width:'550px',fontFamily:'sans-serif'}}>
              {this.getbuses()}
            </Form.Control>
            </Form.Group>

          <Form.Group controlId="formGroupBus" as={Col} md="4">
             <h4><strong><Form.Label >Select Route <FontAwesomeIcon icon={faRoute}/></Form.Label></strong></h4>
            <Form.Control name="route_id" onChange={this.handleRouteChange} required as="select" placeholder="Select Route" style={{height:'40px',width:'550px',fontFamily:'sans-serif'}}>
              {this.getroutes()}
          </Form.Control>
      </Form.Group>
    </Form.Row>
    </Form>
            
    <Button style={{width:200}} type="submit" className="signInSubmit signInInput" onClick={this.AssignBus}>Assign Route <FontAwesomeIcon icon={faChevronRight}/></Button>
</div>


        </div>
    );
  }
}