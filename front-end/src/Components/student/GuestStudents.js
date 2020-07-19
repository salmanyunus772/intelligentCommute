import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";
import { Navbar, Nav,Container,Row,Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Loading from "./Loading";


export default class GuestStudents extends React.Component {
    constructor(props) {
      super(props);
      this.onChangeStops=this.onChangeStops.bind(this);
      this.OnSubmit=this.OnSubmit.bind(this);
      this.state = {
        stop:'',
        loading: false,
        dateArray:[],
        countArray:[],
        probArray:[],
        missArray:[],
        avgArray:[],
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
          name: 'Seats Were Available',
          data: [],
        },{
        name:'Get Seat %',
        data :[],
      },{
      name:'Miss Seat %',
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
    onChangeStops(e) {
      this.setState({ stop: e.target.value });
    }
    OnSubmit(){
      this.setState({ loading:true });
      
    axios.post("/api/student/guestChart",{stop:this.state.stop}).then(response => {
      this.setState({countArray:[]})
      this.setState({avgArray:[]})
       var data=response.data
      data.forEach((temp)=>{
            this.state.dateArray.push(temp.date);
            this.state.countArray.push(temp.datecount);
            this.state.probArray.push(temp.get_seat);
            this.state.missArray.push(temp.miss_seat);
            //this.state.sumArray.push(sum(this.state.probArray))
      })
      this.state.series[0].data=this.state.countArray;
      this.state.series[1].data=this.state.probArray;
      this.state.series[2].data=this.state.missArray;
      
      // console.log(this.state.series);
      // console.log("this is getting array"+this.state.probArray);
      // console.log("this is Missing array"+this.state.missArray)
      
      const SumofGetSeats=this.state.probArray.reduce((total,value)=>{
        return (total+value);
      })
      const SumofMissSeats=this.state.missArray.reduce((total,value)=>{
        return (total+value);
      })
      this.state.avgArray.push(SumofGetSeats,SumofMissSeats)
      const fillpie=this.state.avgArray.map(function(val){
        return val
      })

      this.state.seriespie=fillpie;
      
      
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.state.dateArray
          }
        }
      })
      // var obj=[{
      //   name:"Seats are Avaible",
      //   data:this.state.countArray
      // }]
      // this.setState({series:obj})
    })
    .catch(error => {
      console.log(error);
    store.addNotification({
        title: "Error",
        message: 'Currently Stop not assigned to any Bus',
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
        <strong><i><h1 style={{color:"#8300ff"}}>Select Your Bus Stop to Check the Seats Availability</h1></i></strong>
        <div style={{width:300}}>
            <select className="registerInput registerInputText registerSelect" name="stop" id="stopnbr" onChange={this.onChangeStops}  >
              <option value="Saddar, Rawalpindi"   className="registerOption ">
                Saddar
              </option>
              <option value="6th Road, Rawalpindi" className="registerOption ">
              6th Road
              </option>
              <option value="I.J.P. Road, Islamabad" className="registerOption ">
              IJP Road
              </option>
              <option value="chandni chowk murree road rawalpindi" className="registerOption ">
              Chandni Chowk
              </option>
              <option value="Committee Chowk Stop, Rawalpindi" className="registerOption ">
              Committee Chowk
              </option>
              <option value="Rehmanabad" className="registerOption ">
              Rehmanabad
              </option>
            </select>
            </div>
            <div style={{paddingTop:20}}><Button variant="info" type="submit" onClick={this.OnSubmit}>Find Availability </Button> </div>
          <div style={{marginLeft:150}}>
          <Container>
                <Row>
        <Col>
        <strong><i><h1>Seats Availability Chart</h1></i></strong>
        <Chart options={this.state.options} series={this.state.series} type='bar' width={500} height={300} />
        </Col>
        <Col>
        <h1>On Average Percentages</h1>
        <Chart options={this.state.optionspie} series={this.state.seriespie} type='pie' width={350} height={230} />
        </Col>
        </Row>
        </Container> 
        </div>
        </div>
      )
    }
  }