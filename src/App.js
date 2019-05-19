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
    defaultCenter={{ lat: 39.970008, lng: 116.325888 }}
  >
    <Marker
      position={{ lat: 39.975836, lng: 116.318335 }}
    />
    <Marker
      position={{ lat: 39.944608, lng: 116.340835 }}
    />
    <Marker
      position={{ lat: 39.919566, lng: 116.306319 }}
    />
    <Marker
      position={{ lat: 39.974179, lng: 116.293727 }}
    />
    <Marker
      position={{ lat: 39.999667, lng: 116.326444 }}
    />
  </GoogleMap>
));


class MapApp extends React.Component {


  render() {
    return (
      <div className="App">
        <div id="sidebarlist">
          <h2>Locations</h2>
          <button className="searchButton">Filter</button>
          <div className="search-input">
            <input type="text" placeholder="Input a Location"/>
          </div>
        </div>
        <header>
          <nav>
            <div id="buttonOnSidebar">
              <svg id="sidebar">
                <path d="M8 23a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8zm0-6a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8zm0-6a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H8z" fill-rule="nonzero"></path>
              </svg>
            </div>
            <div id="title">
              <h1>Neighborhood Map</h1>
            </div>
          </nav>
        </header>
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
