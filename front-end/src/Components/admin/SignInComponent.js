import React from "react";
import "../css/signInComponent.css";
export default class SignInComponent extends React.Component {
 
  render() {
    return (
      <div className="signInComponentContainer2">

            <form className="signInForm" >
            <input onChange={this.props.onChangeEmail} id="email" className="centerPlaceHolder signInInput signInInputText" name="email" type="email" placeholder="Email"/>
            <input onChange={this.props.onChangePass} id="password" className="centerPlaceHolder signInInput signInInputPass" name="pass"  type="password" placeholder="Password"/>
            <div className="signInRemember">
              <label className="signInCheckbox-label">
                <input type="checkbox" className="signInCheckbox signInInput" />
                <span className="signInCheckbox-custom SignInCircular"></span>
              </label>
              <p className="signInText">Remember me</p>
            </div>
          </form>
          <button type="submit"  className="signInSubmit signInInput" onClick={this.props.onSubmit}  >Submit</button>
      </div>
    );
  }
}
