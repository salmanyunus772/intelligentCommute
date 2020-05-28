import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
const iconPerson = new L.Icon({
    iconUrl: require('../../../../icons/marker1.png'),
    iconRetinaUrl: require('../../../../icons/marker1.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    
});
class Routemap1 extends Component {
  constructor(){
    super();
    this.state={
      position: [33.6518307,73.1544046],
      stores:[ 
      {lat:33.6879803,lng:73.1074905} ,
      {lat:33.6639735,lng:73.0787736},
      {lat:33.6500657,lng:73.0741215},
      {lat:33.6429102,lng:73.0659414}  
    
    ]
    }
  }
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.lat,
       lng: store.lng
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    
    return (
        
      <div style={{textAlign:'center', height: '80vh',borderRadius:10, width: '80%',margin:'50px auto',padding:20,background:'white' }}>
      <h2 className="display-4">Your Bus </h2>
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
    );

  }

//   componentWillMount(){

//     var config = {
//         headers: {'Authorization': "bearer " + localStorage.getItem('token')}
//     };

//     var bodyParameters = {
//       key: "value"
//     }
//     axios.post( 
//       'http://localhost:3000/api/student/getLocation',
//       bodyParameters,
//       config
//     ).then((response) => {
//      this.setState({position:[response.data.lat,response.data.lng]})
//     }).catch((error) => {
//       console.log(error)
//     });
  
// }
// componentWillUpdate(){
//   setTimeout(function(){
    
//     var config = {
//       headers: {'Authorization': "bearer " + localStorage.getItem('token')}
//   };

//   var bodyParameters = {
//     key: "value"
//   }
//   axios.post( 
//     'http://localhost:3000/api/student/getLocation',
//     bodyParameters,
//     config
//   ).then((response) => {
//    this.setState({position:[response.data.lat,response.data.lng]})
//   }).catch((error) => {
//     console.log(error)
//   });
//     }.bind(this),5000);
// }
// }
}
export default Routemap1;