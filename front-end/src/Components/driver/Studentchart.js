import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import { Navbar, Nav,Container,Row,Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Loading from "./Loadingdriver";


export default class Studentchart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        dateArray:[],
        authstd:[],
        un_authstd:[],
        // missArray:[],
        // avgArray:[],
        options: {
          chart: {
            id: 'apexchart-example',
            animations: {
              enabled: true,
              easing: 'easein',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 350
              }
            }
          },
          xaxis: {
            categories:[],
          }
        },
        series: [{
          name: 'Total Registered Students',
          data: [],
        },{
        name:'Authorize Students',
        data :[],
      },{
      name:'Un Authorized Students',
      data :[],
    }
    
    ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          }
      },
      seriespie: [],
            optionspie: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Getting Seat %','Missing Seat %'] ,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
    }
  }
    
//     componentWillMount(){ 
      
//     axios.post("/api/driver/AuthenticStdCount").then(response => {
//       console.log('ur response from cammmmmmmmmmmmmereaaa')
//       console.log('responsexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',response)
//       this.setState({countArray:[]})
//        var data=response.data
//       // data.forEach((temp)=>{
//       //       this.state.dateArray.push(temp.date);
//       //       this.state.countArray.push(temp.datecount);
//       //       this.state.probArray.push(temp.get_seat);
//       //       this.state.missArray.push(temp.miss_seat);
//       //       //this.state.sumArray.push(sum(this.state.probArray))
//       // })
//       // this.state.series[0].data=this.state.countArray;
//       // this.state.series[1].data=this.state.probArray;
//       // this.state.series[2].data=this.state.missArray;
      
      
      
//       // this.state.seriespie=fillpie;
      
      
//       this.setState({
//         options: {
//           ...this.state.options,
//           xaxis: {
//             ...this.state.options.xaxis,
//             categories: this.state.dateArray
//           }
//         }
//       })

//     })
//     .catch(error => {
//       console.log(error);
//     store.addNotification({
//         title: "Error",
//         message: 'Error During Loading',
//         type: "danger",
//         insert: "top",
//         container: "top-right",
//         animationIn: ["animated", "fadeIn"],
//         animationOut: ["animated", "fadeOut"],
//         dismiss: {
//           duration: 5000,
//           onScreen: true
//         }
//   });
// })
// }

    render() {
      return (
        <div>
        
          <ReactNotification/>
        <strong><i><h1 style={{color:"#8300ff"}}> </h1></i></strong>
          <div style={{marginLeft:150}}>
          <Container>
                <Row>
        <Col>
        <strong><i><h1>Authorize vs UnAuthorize Students</h1></i></strong>
        <Chart options={this.state.options} series={this.state.series} type='bar' width={500} height={300} />
        </Col>
        <Col>
        <h1> Un Authorized Students</h1>
        <Chart options={this.state.optionspie} series={this.state.seriespie} type='pie' width={350} height={230} />
        </Col>
        </Row>
        </Container> 
        </div>
        </div>
      )
    }
  }