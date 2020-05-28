import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';

export default  () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNg3W6CHJgCDNDN94eXTsSbdN9BiG1klA"
      loadingElement={<div style={{ height: `100%`,width:`100%` }} />}
    />
  );
};

