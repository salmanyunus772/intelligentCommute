/*global google*/
import React, { Component } from "react";
import axios from "axios";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
class Map extends Component {
  state = {
    directions: null,
    origin:[0,0],
    destination:[0,0],
    waypoints:[[0,0],[0,0],[0,0],[0,0],[0,0]]
  };

  componentDidMount() {
    
    var config = {
      headers: { Authorization: "bearer " + localStorage.getItem("token") }
    };

    var bodyParameters = {};

    axios
    .post("/api/student/getroutes",config,bodyParameters)
    .then(response => {
      
      this.setState({
        origin:response.data.routes[0].origin,
        destination:response.data.routes[0].destination,
        waypoints:response.data.routes[0].stops,

      })
      console.log(this.state.origin[0]);
      const directionsService = new google.maps.DirectionsService();

    // const origin = { lat: 40.756795, lng: -73.954298 };
    // const destination = { lat: 41.756795, lng: -78.954298 };

    directionsService.route(
      {
        origin: {lat:this.state.origin[0],lng:this.state.origin[1]},
        waypoints:[{location:{ lat: this.state.waypoints[0][0], lng: this.state.waypoints[0][1]},stopover:true},{location:{ lat: this.state.waypoints[1][0], lng: this.state.waypoints[1][1] },stopover:true},{location:{ lat: this.state.waypoints[2][0], lng: this.state.waypoints[2][1] },stopover:true},{location:{ lat: this.state.waypoints[3][0], lng: this.state.waypoints[3][1] },stopover:true}],
        destination:  {lat: this.state.waypoints[4][0], lng: this.state.waypoints[4][1] },
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
    })
    .catch(err => {
     
    });

    
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
          containerElement={<div style={{ height: `580px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
     
      <div style={{textAlign:'center', height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
      <h2 className="display-4">Track Fleet </h2>
      
         <Map center={this.state.position} zoom={13}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            
            <Marker opacity='1' icon={iconPerson} position={this.state.position}>
           {/* {this.displayMarkers()} */}
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            <Marker opacity='1' icon={iconPerson} position={this.state.stores[0]} onClick={() => <Popup>You clicked me!</Popup>} > 
            </Marker>
            <Marker opacity='1' icon={iconPerson} position={this.state.stores[1]}></Marker>  
        </Map>
    </div>


      </div>
    );
  }
}

export default Map;
