/*global google*/
import React, { Component } from "react";
import axios from "axios";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
export default class ProfileMap extends Component {
  state = {
    directions: null,
    origin:[33.6518307,73.1544046],
    destination:[33.6518307,73.1544046],
    position:[],
    waypoints:[[33.6396671,73.038332],[33.6429102,73.0659414],[33.6314228,73.070461],[33.611013,73.0633077],[33.5953144,73.0427652]]
  };
  //const origin = { lat: 40.756795, lng: -73.954298 };
  // const destination = { lat: 41.756795, lng: -78.954298 };
  componentDidMount() {
    
    // var config = {
    //   headers: { Authorization: "bearer " + localStorage.getItem("token") }
    // };

    // var bodyParameters = {};

    // axios
    // .post("/api/student/studentRoute",bodyParameters,config)
    // .then(response => {
      
    //   this.setState({
    //     origin:response.data.route.origin,
    //     destination:response.data.route.destination,
    //     waypoints:response.data.route.stops,

    //   })
      
    //   const directionsService = new google.maps.DirectionsService();

    // // const origin = { lat: 40.756795, lng: -73.954298 };
    // // const destination = { lat: 41.756795, lng: -78.954298 };

    // directionsService.route(
    //   {
    //     origin: {lat:this.state.origin[0],lng:this.state.origin[1]},
    //     // waypoints:[{location:{ lat: this.state.waypoints[0][0], lng: this.state.waypoints[0][1]},stopover:true}],
    //     destination:  {lat: this.state.destination[0], lng: this.state.destination[1] },
    //     optimizeWaypoints: true,
    //     travelMode: google.maps.TravelMode.DRIVING
    //   },
    //   (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.setState({
    //         directions: result
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );
    // })
    // .catch(err => {
     
    // });
      const directionsService = new google.maps.DirectionsService();

    
    directionsService.route(
      {
        origin: {lat:this.state.origin[0],lng:this.state.origin[1]},
        waypoints:[{location:{ lat: this.state.waypoints[0][0], lng: this.state.waypoints[0][1]},stopover:true},
                   {location:{ lat: this.state.waypoints[1][0], lng: this.state.waypoints[1][1]},stopover:true},
                   {location:{ lat: this.state.waypoints[2][0], lng: this.state.waypoints[2][1]},stopover:true},
                   {location:{ lat: this.state.waypoints[3][0], lng: this.state.waypoints[3][1]},stopover:true},
                   {location:{ lat: this.state.waypoints[4][0], lng: this.state.waypoints[4][1]},stopover:true}
                   
      
      ],
        destination:  {lat: this.state.destination[0], lng: this.state.destination[1] },
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.state.origin[0], lng: this.state.origin[1] }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `400px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}


