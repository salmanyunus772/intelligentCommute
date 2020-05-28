import React from "react";
import "./css/signInComponent.css";

export default class SignInComponent extends React.Component {
 
  render() {
    return (
      <div className="signInComponentContainer2">

            <form className="signInForm" >
            <div style={{color:"red"}} class="input-group input-group-med">
              <span class="input-group-addon">
               <i class="fa fa-envelope"></i>
              </span>
            <input onChange={this.props.onChangeEmail} id="email" class="form-control" name="email" type="email" placeholder="Email"/>
            </div>
            <div class="input-group input-group-med">
  <span class="input-group-addon">
    <i class="fa fa-lock"></i>
  </span>
{/*className="centerPlaceHolder signInInput signInInputPass" */}
            <input class="form-control" onChange={this.props.onChangePass} id="password"  name="pass"  type="password" placeholder="Password"/>
         </div>
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
