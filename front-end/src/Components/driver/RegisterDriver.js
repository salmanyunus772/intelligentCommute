import React from "react";
import "./css/register.css";
import RegisterationDriverComponent from "./RegisterationDriverComponent";
import axios from "axios";
import Loading from "./Loadingdriver";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default class Registerdriver extends React.Component {
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.verify = this.verify.bind(this);
        this.notify = this.notify.bind(this);

        this.state = {
            loading: false,
            pass: "",
            cell: 1,
            firstName: "",
            lastName: "",
            cPass:""
          };
    }
    onChangeData(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      onSubmit() {
        this.setState({ loading: true });
        if (this.verify()) {
          axios
            .post("/api/driver/registerdriver", {
              pass: this.state.pass,
              cell: this.state.cell,
              firstName: this.state.firstName,
              lastName: this.state.lastName
            })
            .then(data => {
              this.notify("Driver Registered", "success");
              let token= data.data.token;
              this.setState({ loading: false });
              localStorage.setItem("token",token);
            })
            .catch(err => {
              console.log(err);
              this.notify(err.response.data.error, "danger");
              this.setState({ loading: false });
            });
        } else {
          this.setState({ loading: false });
        }
      }
    
  verify() {
    if (this.state.firstName === ""  || this.state.firstName.length <3) {
      this.notify("Enter Valid First Name ", "danger");
      return false;
    }
    if (this.state.lastName === ""  || this.state.lastName.length <3) {
        this.notify("Enter Valid Last Name ", "danger");
        return false;
    }if (this.state.cell === ""  || this.state.cell.length <11) {
        this.notify("Enter Valid Phone Number ", "danger");
        return false;
    }
    if (this.state.pass.length < 8) {
      this.notify("Password length must be greater then 8", "danger");
      return false;
    }
    if (this.state.pass !== this.state.cPass) {
      this.notify("Password required", "danger");
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
    render(){
        let loading = "";
        let containerClassess = "registerContainer ";
        if (this.state.loading === true) {
           loading = <Loading />;
          containerClassess += " blur";
        }
        
        return(
            <div>
                <img alt="Logo" className="logo" src={require('../../icons/icon.svg')}  /> 
                {loading}
        <div className={containerClassess}>
          <ReactNotification />
          <div className="registerHeading">
            <h2 className="registerH2" style={{fontFamily:'Coronetscript, cursive',fontWeight:'bold'}}>Register</h2>
          </div>
          <RegisterationDriverComponent
            onChange={this.onChangeData}
            onClick={this.onSubmit}
          />
       </div>
      <p></p>
      <p></p>
</div>

        );
    }

}