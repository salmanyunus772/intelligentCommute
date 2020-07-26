import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
const iconPerson = new L.Icon({
    iconUrl: require('../../icons/marker1.png'),
    iconRetinaUrl: require('../../icons/marker1.png'),
    iconAnchor: null,
    popupAnchor:[0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    
    
});
const iconPerson2 = new L.Icon({
  iconUrl: require('../../icons/Uni.png'),
  iconRetinaUrl: require('../../icons/Uni.png'),
  iconAnchor: null,
  popupAnchor:[0, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  
});
class Mapp extends Component {
  constructor(){
    super();
    this.state={
      position: [33.6518307,73.1544046],
      BusesCurrentLocations:[],
      stores:[]
    }
  }
  
  displayMarkers = () => {
    if(!this.state.stores){
      return ;
    }
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} opacity='1' icon={iconPerson} position={{
       lat: store.lat,
       lng: store.lng
     }}     
     ><Popup>
     This is Bus {store.busNumber}
   </Popup> 
     </Marker>
    })
  }
  render() {
    
    return (
        
      <div style={{textAlign:'center', height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
      <h2 className="display-4">Track Fleet </h2>
      
         <Map center={this.state.position} zoom={13} opacity='1' icon={iconPerson}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.displayMarkers()}

            <Marker opacity='1' icon={iconPerson2} position={{
              lat: 33.6518307,
              lng: 73.1544046
              }}
                 
     ><Popup>
     This is Comsats University.
   </Popup> 
     </Marker>
        </Map>
    </div>
    );

  }

  componentWillMount(){

    var config = {
        headers: {'Authorization': "bearer " + localStorage.getItem('token')}
    };

    var bodyParameters = {
      key: "value"
    }
    axios.post( 
      '/api/admin/getAllBusesLocation',
      bodyParameters,
      config
    ).then((response) => {
      let locationsAsResponse=[];
      response.data.forEach(element => {
        locationsAsResponse.push({
          busNumber:element.busNumber,
          lat:element.location[0],
          lng:element.location[1]
        })    
      })
     this.setState({stores:locationsAsResponse})
    }) 
    .catch((error) => {
      console.log(error)
    });
}
componentWillUpdate(){
  setTimeout(function(){
    
    var config = {
      headers: {'Authorization': "bearer " + localStorage.getItem('token')}
  };

  var bodyParameters = {
    key: "value"
  }
  axios.post( 
    '/api/admin/getAllBusesLocation',
    bodyParameters,
    config
  ).then((response) => {
    let locationsAsResponse=[];
    response.data.forEach(element => {
      locationsAsResponse.push({
        busNumber:element.busNumber,
        lat:element.location[0],
        lng:element.location[1]
      })    
    })
   this.setState({stores:locationsAsResponse})   
  }) 
  .catch((error) => {
    console.log(error)
  });
    }.bind(this),5000);
}
}

export default Mapp;