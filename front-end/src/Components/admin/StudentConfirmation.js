import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { faExclamationTriangle,faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const StudentConfirmation = props => {
  const [getStudents, setStudents] = useState([]);

  const confirmStudent = e => {
      console.log("button presses");
    e.persist()
    var config = {
      //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {
      reg: e.target.name
    };
    axios
      .post(
        // http://localhost:3000
        "/api/admin/confirmStudent",
        bodyParameters,
        config
      )
      .then(response => {
        let id=parseInt(e.target.id.split(' ')[1]);
        let x=[...getStudents];
        x[id].Confirm=true;
        setStudents(x);
        store.addNotification({
          title: "Success",
          message: "Registration Approved",
          type: "success",
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
      .catch(error => {
        store.addNotification({
          title: "Error",
          message: "Registration Not Approved",
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
      });
  };
  const createTable = students => {
    if (getStudents === []) {
      return {};
    } else {
      let table = [];
      getStudents.forEach((element, key) => {
        table.push(
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{element.firstName}</td>
            <td>{element.lastName}</td>
            <td>{element.reg}</td>
            <td>
              <Button
                name={element.reg}
                id={'btn '+ key}
                variant={!element.Confirm ? "danger" : "success"}
                onClick={!element.Confirm ? confirmStudent : () => {}}
              >
                {element.Confirm ? "Approve" : "Not Approved"}
                {element.Confirm? <FontAwesomeIcon icon={faCheckDouble}/>:<FontAwesomeIcon icon={faExclamationTriangle}/>}
              </Button>
            </td>
          </tr>
        );
      });
      return table;
    }
  };

  useEffect(() => {
    var config = {
      //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {};
    axios
      .get(
        // http://localhost:3000
        "/api/admin/getConfirmStatus",
        bodyParameters,
        config
      )
      .then(response => {
          console.log(response.data.students);
        setStudents(response.data.students);
      })
      .catch(error => {});
  }, []);

  let content = (
    <div>
      <ReactNotification />

      <Table responsive>
        <thead style={{backgroundColor:'#363970'}}>
          <tr>
            <th style={{color:'white'}}>#</th>
            <th style={{color:'white'}}>First Name</th>
            <th style={{color:'white'}}>Last Name</th>
            <th style={{color:'white'}}>Reg</th>
            <th style={{color:'white'}}>Status</th>
          </tr>
        </thead>
        <tbody>{createTable()}</tbody>
      </Table>
    </div>
  );
  return content;
};

export default StudentConfirmation;
