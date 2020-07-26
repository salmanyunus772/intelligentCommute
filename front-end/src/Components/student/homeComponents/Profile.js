import React, { Component } from 'react';
import { Form, Col, Nav,Button } from 'react-bootstrap';
import axios from 'axios';
import NavLink from 'react-bootstrap/NavLink';
import Loading from "../css/Loading";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faUserMinus,faIdCardAlt,faIdCard,faEnvelopeOpenText,faPhoneAlt,faBusAlt,faHouseUser,
  faUserTag,faClock,faRoad, faMale,faInfoCircle,faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
 
class Profile extends Component {
  constructor(){
    super();
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.stopChange=this.stopChange.bind(this);
    this.onChangeContact=this.onChangeContact.bind(this);
    this.verify=this.verify.bind(this);
    this.OnUpdate=this.OnUpdate.bind(this);
    this.OnCancel=this.OnCancel.bind(this);
    this.state={
      loading: false,
      email:"",
        reg:"",
        firstName:"",
        lastName:"",
        stop:"",
        busNumber:"",
        rfid:"",
        serviceExpiresOn:"",
        balance:"",
        EmergencyContact:1,
        id:0,
        driverName:'',
        driverContact:'',
        counter:0

    }
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
    this.setState({ counter:1 });
    
    

  }
  stopChange(e){
    this.setState({ stop: e.target.value });
    this.setState({ counter:1 });
    
    
    
  }
  onChangeContact(e){
    this.setState({ EmergencyContact: e.target.value });
    this.setState({ counter:1 });

    
    
  }
  OnCancel(){
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
   };
   var bodyParameters = {
    reg:this.state.reg
  };
  axios
        .post("/api/student/cancelregistration", 
        bodyParameters,
        config)
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
        .catch(err => {
          console.log(err);
          store.addNotification({
              title: "Error",
              message: "Cannot Cancel Your Registration This Time",
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
  OnUpdate(){
    if (this.verify() && this.state.counter>0) {
      var config = {
        headers: { Authorization: "bearer " + localStorage.getItem("token") }
     };
     var bodyParameters = {
      email: this.state.email,
      stop:this.state.stop,
      EmergencyContact:this.state.EmergencyContact
    };
      axios
        .post("/api/student/updateprofile", 
        bodyParameters,
        config)
        .then(response => {
          console.log(response);
          //this.notify(data.data.message, "success");
          let token = response.data.token;
          this.setState({ loading: false });
          localStorage.setItem("token",token);
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
  }); })
       
    } else {
      store.addNotification({
        title: "Error",
        message: "Valid Details are Required or You may haven't enter updated details. ",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
  });}

  }
    verify() {
      //eslint-disable-next-line
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(String(this.state.email).toLowerCase())) {
        this.notify("Provide correct email", "danger");
        return false;
      }
      if (this.state.stop == "" ) {
        this.notify("Bus Stop Required", "danger");
        return false;
      }

      if((this.state.EmergencyContact=="") || (this.state.EmergencyContact.length < 11 )){
        return false;
      }
      return true;
    }
    notify(message, type) {
      console.log(message + " " + type);
      store.addNotification({
        title: message,
        message: " ",
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }

  componentDidMount(){    
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
   };

   var bodyParameters = {
   };
   axios
     .post(
       "/api/student/viewProfile",
       bodyParameters,
       config
     )
     .then(response => {
      this.setState({
        email:response.data.email,
        reg:response.data.reg,
        firstName:response.data.firstName,
        lastName:response.data.lastName,
        stop:response.data.stop,
        EmergencyContact:response.data.EmergencyContact,
        busNumber:response.data.busNumber,
        rfid:response.data.rfid,
        serviceExpiresOn:response.data.serviceExpiresOn,
        id:response.data.id,
        driverName:response.data.driverName,
        driverContact:response.data.driverContact

      
      });
    })
     .catch(error => {
         console.log(error);
     });

  }

  render() {
    let loading = "";
    let containerClassess = "registerContainer ";
    if (this.state.loading === true) {
      loading = <Loading />;
      containerClassess += " blur";
    }
    
    return (
      // Important! Always set the container height explicitly
     
     
      
      <div style={{ height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
         <ReactNotification/>
      <h3 style={{fontFamily:'Georgia',fontWeight:'bold',fontSize:30,textAlign:'center',color:"#271470"}}><strong><i>Your Personal Details  <FontAwesomeIcon icon={faIdCard} size='1.5x' /></i></strong></h3>
      <Form>
      
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>First Name <FontAwesomeIcon icon={faMale} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.firstName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Last Name <FontAwesomeIcon icon={faMale} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.lastName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label style={{fontSize:'15px'}}>Email <FontAwesomeIcon icon={faEnvelopeOpenText} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.email}
            onChange={this.onChangeEmail}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Registration No <FontAwesomeIcon icon={faIdCardAlt} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.reg}
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} md="4" >
        {/* <i class="glyphicon glyphicon-earphone"> */}
          <Form.Label>Emergency Contact  <FontAwesomeIcon icon={faPhoneAlt} size='1.9x'/></Form.Label>
          {/* </i> */}
          <Form.Control
            type="Number"
            placeholder={this.state.EmergencyContact}
            onChange={this.onChangeContact}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
        <label className="registerLabel"> Bus Stop  <FontAwesomeIcon icon={faHouseUser} size='1.9x'/></label>
            <select className="registerInput registerInputText registerSelect" name="stop" value={this.state.stop} onChange={this.stopChange}  >
              <option value="Saddar, Rawalpindi"   className="registerOption ">
                Saddar
              </option>
              <option value="6th Road, Rawalpindi" className="registerOption ">
              6th Road
              </option>
              <option value="I.J.P. Road, Islamabad" className="registerOption ">
              IJP Road
              </option>
              <option value="chandni chowk murree road rawalpindi" className="registerOption ">
              Chandni Chowk
              </option>
              <option value="Committee Chowk Stop, Rawalpindi" className="registerOption ">
              Committee Chowk
              </option>
              <option value="Rehmanabad" className="registerOption ">
              Rehmanabad
              </option>
              </select>
          </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Assigned RF-ID <FontAwesomeIcon icon={faUserTag} size='1.9x'/></Form.Label>
          <Form.Control
            type="Number"
            placeholder={this.state.rfid}
            disabled
          />
          </Form.Group>
          <Form.Group as={Col} md="4" >
          <Form.Label>Valid Before <FontAwesomeIcon icon={faClock} size='1.9x'/></Form.Label>
          <Form.Control
            type="Number"
            placeholder={this.state.serviceExpiresOn}
            disabled
          />
          </Form.Group>

          <Form.Group as={Col} md="4" >
          <Form.Label>Assigned Route <FontAwesomeIcon icon={faRoad} size='1.9x'/></Form.Label>
          <Form.Control
            type="Number"
            placeholder={this.state.id}
            disabled
          />
          </Form.Group>
      </Form.Row>
      <Button variant="warning" onClick={this.OnCancel}>Cancel Your Registeration <FontAwesomeIcon icon={faUserMinus}/></Button>
      <Button style={{marginLeft:50,width:170}} variant="info" onClick={this.OnUpdate}>Update Your Details <FontAwesomeIcon icon={faUserEdit}/></Button>
    </Form>

    <h3 style={{fontFamily:'Georgia',fontWeight:'bold',fontSize:30,textAlign:'center',paddingTop:10,color:"#271470"}}><strong><i>Bus And Driver Details <FontAwesomeIcon icon={faInfoCircle} size='1.9x'/></i></strong></h3>
      <Form style={{paddingTop:10}}>
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Bus Number <FontAwesomeIcon icon={faBusAlt} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.busNumber}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Driver Name <FontAwesomeIcon icon={faMale} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.driverName}
            disabled
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Driver Contact <FontAwesomeIcon icon={faPhoneAlt} size='1.9x'/></Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.driverContact}
            disabled
          />
          </Form.Group>
          </Form.Row>
          </Form>

    <p></p>
      </div>
    );
   
  }
}
 
export default Profile;