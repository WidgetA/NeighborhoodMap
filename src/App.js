import React from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Locations from './location.json'


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 39.970008, lng: 116.325888 }}
  >
  {
    props.markers.map(marker => (
      <Marker
        position = {marker}
      />
    ))
  }
    
  </GoogleMap>
));


class MapApp extends React.Component {

  state = {
    markers: [{lat: 39.975836, lng: 116.318335}],
    locationBar: true
  }

  handleClick() {
    this.setState({locationBar: !this.state.locationBar})
  }

  render() {
    return (
      <div className="App">
        {
          this.state.locationBar ? (
            <div id="sidebarlist">
              <h2>Locations</h2>
              <button className="searchButton">Filter</button>
              <div className="search-input">
                <input type="text" placeholder="Input a Location"/>
              </div>
            </div>
          ) : (
          <div></div>)
        }
        <header>
          <nav>
            <div id="buttonOnSidebar" onClick={this.handleClick.bind(this)}>
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
          mapElement={<div id="map"/>}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

export default MapApp;
