import React from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 39.975836, lng: 116.318335 }}
  >
    <Marker
      position={{ lat: 39.975836, lng: 116.318335 }}
    />
  </GoogleMap>
));


class MapApp extends React.Component {



  render() {
    return (
      <div className="App">
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAO2Qc8-Ef1roxaLlccqGTfNLkTUGJsqMQ&libraries=geometry,drawing,places"
          loadingElement={<div id="loading"/>}
          containerElement={<div id="container"/>}
          mapElement={<div id="map"/>}/>
      </div>
    );
  }
}

export default MapApp;
