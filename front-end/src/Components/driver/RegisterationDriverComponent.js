import React from "react";
import "./css/registerComponent.css";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RegisterationDriverComponent extends React.Component {
  render() {
    return (
      <div className="r">
        <form>
          <div className="registerFormContainer">
            <label className="registerLabel">First Name</label>
            <input className="registerInput registerInputText" name="firstName" onChange={this.props.onChange} type="text" />
            <label className="registerLabel">Last Name</label>
            <input className="registerInput registerInputText" name="lastName" onChange={this.props.onChange} type="text" />
            <label className="registerLabel">Cell Phone</label>
            <input className="registerInput registerInputText" name="cell" onChange={this.props.onChange} type="number" />
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
