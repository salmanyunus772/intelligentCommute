import React from "react";
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faChair, faBusAlt,faBus, faTrash, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AddBuses extends React.Component {
    constructor(){
        super();
        this.onChangeSeats=this.onChangeSeats.bind(this);
        this.OnchangePlate=this.OnchangePlate.bind(this);
        this.OnSubmit=this.OnSubmit.bind(this);
        this.verify=this.verify.bind(this);
         this.getbuses=this.getbuses.bind(this);
         this.handleChange=this.handleChange.bind(this);
        
         this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            busNumber:0,
            noOfSeats:0,
            occupiedSeats:0,
            schedule_id:'',
            location:'',
            uniBus:[],
            busnumber:'',

        }
    }

    OnchangePlate(e){
        this.setState({
        busNumber:e.target.value });
    }
    onChangeSeats(e){
        this.setState({
            noOfSeats:e.target.value });
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
                "http://localhost:3000/api/admin/deleteBus",
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
    OnSubmit(){
        if(this.verify()){
             var bodyParameters = {
              busNumber:this.state.busNumber,
              noOfSeats: this.state.noOfSeats,
              occupiedSeats:this.state.occupiedSeats
             };
             axios
             .post("/api/admin/addBus",
             bodyParameters,
             ) 
              .then(response => {
                if(response.data.message=="Already Registered"){
                  store.addNotification({
                    title: "Error",
                    message: "Bus Already Registered",
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
                else{
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
            }
          })
              .catch(error => {
                store.addNotification({
                    title: "Error",
                    message: "Something went wrong",
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
    verify(){
        if(this.state.busNumber.length < 6){
            store.addNotification({
                title: "Invalid Entry of Number Plate",
                message: "try again with Valid Number Plate No",
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
          return false
        }
        return true
    }

render(){
    return(
        <div> 
        <Form>
        <ReactNotification/>
          <Form.Group> <h1><Form.Label>Register New Bus</Form.Label></h1>
            <Form.Label style={{fontSize:'17px',width:"650px"}}>Bus Number Plate <FontAwesomeIcon icon={faBus}/></Form.Label>
            <Form.Control onChange={this.OnchangePlate} required type="text" placeholder="ACX-861" >
            </Form.Control>
          </Form.Group>
          <Form.Group  >
            <label style={{fontSize:'17px'}}>No of Seats <FontAwesomeIcon icon={faChair}/></label>
            <select style={{maxWidth:80,marginLeft:10,maxHeight:'30px'}} className="registerInput registerInputText registerSelect" name="noOfSeats" id="seatno" onChange={this.onChangeSeats}  >
              <option value="4" className="registerOption "> 4 </option>
              <option value="5" className="registerOption "> 5 </option>
              <option value="6" className="registerOption "> 6 </option>
              </select> 
          </Form.Group>
          </Form>
          <Button variant="primary" type="submit" onClick={this.OnSubmit}>Register Bus <FontAwesomeIcon icon={faBusAlt}/></Button>
                    
      <div style={{marginTop:30}}>
          <Form onSubmit={this.handleSubmit}>
        <ReactNotification/>
          <Form.Group > <h1> <Form.Label>Delete Registered Buses</Form.Label></h1>
          <label style={{fontSize:'17px'}}>List of Registered Buses <FontAwesomeIcon icon={faStream}/></label>
            <Form.Control name="busnumber" onChange={this.handleChange} required as="select" placeholder="Select Bus" style={{height:'40px',width:'750px',fontFamily:'sans-serif'}}>
                {this.getbuses()}
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="submit">
            Remove Bus <FontAwesomeIcon icon={faTrash}/>
          </Button>
        </Form>
        </div>
        </div>
    );
}

}



