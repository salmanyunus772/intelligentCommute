import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import ReactNotification from "react-notifications-component";

import { Button } from "react-bootstrap";
import Loading from "./css/Loading";


export default class Guest2 extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            seriespie: [10,90],
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
          
          };
        }
        render() {
          return (
      <div id="chart">
  <Chart options={this.state.optionspie} series={this.state.seriespie} type="pie" width={380} />
</div>
    );
}

}