import React from "react";
import "./css/register.css";
import NewFormComponent from "./NewFormComponent";
import axios from "axios";
import Loading from "./Loading";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";


export default class NewForm extends React.Component {
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        //this.onChangeName=this.onChangeName.bind(this);

        this.state = {
            fn: "jojojojojo",
            LastName: "",
            Registration: "",
            Email:"",
            Address:"",
            Guardian:"",
            Password:"",
            Confirmpassword:"",
            stop: "ijp",
            
          };
        
    }
    onChangeName(e) {
        this.setState({
          FirstName: e.target.value
        });
      }

    onChangeData(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      onSubmit(){
    
          }

    render(){
        return(
            <div>
                <NewFormComponent defaultValues={this.state}/>
            </div>
        );
    }

}