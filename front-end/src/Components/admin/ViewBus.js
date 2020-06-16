import React from "react";
import "../../Components/css/register.css";
import {Table,Button,Form, Nav }  from "react-bootstrap";
import { Router, Route, Link } from 'react-router-dom';
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
export default class ViewBus extends React.Component{
    constructor(){
        super();
        this.state={ 
            busesArray:[] };
    }
    componentDidMount(){
        axios
        .get("/api/admin/viewbuses")
        .then(response => {
            this.setState({ busesArray:response.data.buses})

        })
        .catch(err => {
          console.log(err);
        
        });
    }
    createTable = () => {
        if (this.state.busesArray === []) {
          return {};
        } else {
           let table = [];
          this.state.busesArray.forEach((element, key) => {
          table.push(
          <tr key={key}>
          <td>{key + 1}</td>
          <td>{element.busNumber}</td>
          <td>{element.noOfSeats}</td>
          {/* <td>{element.scheduleId}</td> */}
          </tr>
          );
          });
          return table;
        }
      };
     
    render(){
        return(
            <div>
            <ReactNotification />
            <Table responsive>
              <thead style={{backgroundColor:'#363970'}}>
                <tr>
                  <th style={{color:'white'}}>#</th>
                  <th style={{color:'white'}}>Bus No</th>
                  <th style={{color:'white'}}>Seater</th>
                  
                </tr>
              </thead>
              <tbody>{this.createTable()}</tbody>
            </Table>
          </div>
        );
    }
}