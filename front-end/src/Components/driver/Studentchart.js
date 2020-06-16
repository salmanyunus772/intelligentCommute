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
        totalRegStds:[],
        dateArray:[],
        authstd:[],
        un_authstd:[],
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
    },
    
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
      // seriespie: [],
      //       optionspie: {
      //         chart: {
      //           width: 380,
      //           type: 'pie',
      //         },
      //         labels: ['Getting Seat %','Missing Seat %'] ,
      //         responsive: [{
      //           breakpoint: 480,
      //           options: {
      //             chart: {
      //               width: 200
      //             },
      //             legend: {
      //               position: 'bottom'
      //             }
      //           }
      //         }]
      //       },
          
    }
  }
    
    componentWillMount(){ 
      
    axios.post("/api/driver/getCameraStd").then(response => {
      console.log(response)
      this.setState({authstd:[]})
       var data=response.data
      data.forEach((temp)=>{
            this.state.totalRegStds.push(temp.totalSeats);
            this.state.authstd.push(temp.rfid_count);
            this.state.un_authstd.push(temp.camera_count);
            this.state.dateArray.push(temp.Date)
      })
      this.state.series[0].data=this.state.totalRegStds;
      this.state.series[1].data=this.state.authstd;
      this.state.series[2].data=this.state.un_authstd;
      
      
      // this.state.seriespie=fillpie;
      
      
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.state.dateArray
          }
        }
      })

    })
    .catch(error => {
      console.log(error);
    store.addNotification({
        title: "Error",
        message: 'Error During Loading',
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
})
}

    render() {
      return (
        <div>
        
          <ReactNotification/>
        <strong><i><h1 style={{color:"#8300ff"}}> </h1></i></strong>
          <div style={{marginLeft:150}}>
          <Container>
                <Row>
        <Col>
        <strong><i><h1>Authorize vs UnAuthorize Students with Dates</h1></i></strong>
        <Chart options={this.state.options} series={this.state.series} type='bar' width={500} height={300} />
        </Col>
        {/* <Col>
        <h1> Un Authorized Students</h1>
        <Chart options={this.state.optionspie} series={this.state.seriespie} type='pie' width={350} height={230} />
        </Col> */}
        </Row>
        </Container> 
        </div>
        </div>
      )
    }
  }