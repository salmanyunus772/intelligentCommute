
import "./css/registerComponent.css";
import React, { Component } from 'react';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Register extends React.Component {
  render() {
    return (
      <div className="r">
        <form>
          <div className="registerFormContainer">
            <label className="registerLabel">First Name</label>
            <input className="registerInput registerInputText" name="firstName" onChange={this.props.onChange} type="text" />
            <label className="registerLabel">Last Name</label>
            <input className="registerInput registerInputText" name="lastName" onChange={this.props.onChange} type="text" />
            <label className="registerLabel">Email</label>
            <input className="registerInput registerInputText" name="email" onChange={this.props.onChange} type="email" />
            <label className="registerLabel">Registration No</label>
            <input className="registerInput registerInputText" name="reg" onChange={this.props.onChange} type="text" />
            <label className="registerLabel">Emergency Contact</label>
            <input className="registerInput registerInputText" name="EmergencyContact" onChange={this.props.onChange} type="number" />
            
            <label className="registerLabel">Stops</label>
            <select className="registerInput registerInputText registerSelect" name="stop" id="stopnbr" onChange={this.props.onChange}  >
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
            <label className="registerLabel">Password</label>
            <input
              name="pass"
              className="registerInput registerInputText"
              type="password" 
              onChange={this.props.onChange}
            />
            <label className="registerLabel">Confirm Password</label>
            <input className="registerInput registerInputText" type="password"  name="cPass" onChange={this.props.onChange}  />
          </div>
          
        </form>
        <div className="registerSubmitContainer">
            <button className="registerSubmit" onClick={this.props.onClick} >Register Yourself <FontAwesomeIcon icon={faUserPlus}/></button>
          </div>
          </div>
    );
  }
}
