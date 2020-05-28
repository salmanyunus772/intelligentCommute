import React, { Component } from 'react';
import { Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default class DriverSchedule extends Component {
  constructor(){
    super();
    this.createTable=this.createTable.bind(this);
    this.state={
        routeId:"",
        busNumber:"",
        startingDate:"",
        endingDate:"",
        cell:0,
        allSchedules:[]
    }
  }
  componentDidMount(){    
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
   };
  axios.get('/api/driver/viewSchedule',
  config)
        .then(response => {
            this.setState({ allSchedules:response.data.d_schedules})
        })
        .catch(err => {
          console.log(err);
        
        });
    }
        createTable = () => {
            if (this.state.allSchedules === []) {
              return {};
            } else {
               let table = [];
              this.state.allSchedules.forEach((element, key) => {
              table.push(
              <tr key={key}>
              <td>{key + 1}</td>
              <td>{element.routeId}</td>
              <td>{element.busNumber}</td>
              <td>{element.startingDate}</td>
              <td >{element.endingDate}</td>
              </tr>
          );
          });
          return table;
        }    
    }
render() {
    return (
      <div style={{ height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
          <h1><Form.Label style={{fontFamily:"cursive"}}>Your Duty Schedule</Form.Label></h1>
            <div>
            <ReactNotification />
            <Table responsive>
              <thead style={{backgroundColor:'#363970'}}>
                <tr>
                  <th style={{color:'white'}}>#</th>
                  <th style={{color:'white'}}>Route ID</th>
                  <th style={{color:'white'}}>Bus Number</th>
                  <th style={{color:'white'}}>Starting Date</th>
                  <th style={{color:'white'}}>Ending Date</th>
                  {/* <th>Time</th> */}
                </tr>
              </thead>
              <tbody>{this.createTable()}</tbody>
            </Table>
          </div>
          </div>
        );
  }
}
