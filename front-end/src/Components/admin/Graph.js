import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dateArray:[],
        countArray:[],
        probArray:[],
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
            categories: [],
          }
        },
        series: [{
          name: 'No Of Students Embarked',
          data: [],
        }]

      }
    }
  UNSAFE_componentWillMount(){
    axios.get("/api/admin/getAllDatesCounts").then(response => {
       var data=response.data
      data.forEach((temp)=>{
            this.state.dateArray.push(temp.date);
            this.state.countArray.push(temp.datecount);
            this.state.probArray.push(temp.prob)
      })
      this.state.series[0].data=this.state.countArray;
      console.log(this.state.series);
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.state.dateArray
          }
        }
      })
    });  
  }
    render() {
      return (
          <div style={{marginLeft:310}} >
            
            <h1 style={{color:'#53c653'}}><strong><i>Student Prepresenteeism <FontAwesomeIcon icon={faChartBar} /></i></strong></h1>
        <Chart options={this.state.options} series={this.state.series} type='area' width={500} height={320} />
        </div>
      )
    }
  }