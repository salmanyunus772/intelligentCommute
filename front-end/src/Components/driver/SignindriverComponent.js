import React from "react";
import "./css/signInComponent.css";

export default class SignindriverComponent extends React.Component {
 
  render() {
    return (
      <div className="signInComponentContainer2">

            <form className="signInForm" >
            <input onChange={this.props.onChangeCell} id="number" className="centerPlaceHolder signInInput signInInputText" name="cell" type="number" placeholder="Cell No"/>
            <input onChange={this.props.onChangePass} id="password" className="centerPlaceHolder signInInput signInInputPass" name="pass"  type="password" placeholder="Password"/>
            {/* <div className="signInRemember">
              <label className="signInCheckbox-label">
                <input type="checkbox" className="signInCheckbox signInInput" />
                <span className="signInCheckbox-custom SignInCircular"></span>
              </label>
              <p className="signInText">Remember me</p>
            </div> */}
          </form>
          <button type="submit"  className="signInSubmit signInInput" onClick={this.props.onSubmit}  >Submit</button>
      </div>
    );
  }
}
