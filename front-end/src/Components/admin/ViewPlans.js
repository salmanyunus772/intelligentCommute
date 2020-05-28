import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default class ViewPlans extends React.Component {
  constructor() {
    super();
    this.state = {
      plans: []
    };
    this.createTable = this.createTable.bind(this);
  }
  componentDidMount() {
    var config = {
      //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {};
    axios
      .post(
        "http://localhost:3000/api/admin/getPlans",
        bodyParameters,
        config
      )
      .then(response => {
        console.log(response.data)
        this.setState({plans:response.data.plans});
      })
      .catch(error => {});
  }
  createTable() {
    if (this.state.plans === []) {
      return (<tr><td>123</td></tr>);
    } else {
      let table = [];
      this.state.plans.forEach((element, key) => {

        let days="";
        element.planDays.forEach(day => {
          days=days+" "+day;
        });
        

        table.push(
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{element.routeId}</td>
            <td>{element.startingDate}</td>
            <td>{element.endingDate}</td>
            <td>{days}</td>
          </tr>
        );
      });
      return table;
    }
  }
  render() {
    return (
      <div>
        <Table responsive>
          <thead style={{backgroundColor:'#363970'}}>
            <tr>
              <th style={{color:'white'}}>#</th>
              <th style={{color:'white'}}>Route Id</th>
              <th style={{color:'white'}}>Start Date</th>
              <th style={{color:'white'}}>End Date</th>
              <th style={{color:'white'}}>Days</th>
            </tr>
          </thead>
          <tbody>{this.createTable()}</tbody>
        </Table>
      </div>
    );
  }
}

// const studentplans = props => {
//     const [getplans,studentplans]= useState([]);
//     useEffect(()=>{
//         var config = {
//             //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
//           };

//           var bodyParameters = {};
//           axios
//             .get(
//               "http://localhost:3000/api/admin/getplans",
//               bodyParameters,
//               config
//             )
//             .then(response => {
//               setStudents(response.data.students);
//             })
//             .catch(error => {});
//     },[])

// }
