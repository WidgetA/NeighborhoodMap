import React from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Locations from './location.json'
import * as API from './Api.js'


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.center}
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
    markers: Locations.locations,
    center: Locations.center,
    locationBar: true,
    locationList: []
  }

  componentWillMount () {
    const result = [];
    for (let i = 0; i < this.state.markers.length; i++) {
      API.getInfo(this.state.markers[i].lng, this.state.markers[i].lat).then(data => {
        result.push(data)
        this.setState({locationList: result})
      })
    }
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
              <div>
                {
                  this.state.locationList.map((e) => {
                    return (
                      <li>
                        <a>
                          {e}
                        </a>
                      </li>
                      )
                  })
                }
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
          center={this.state.center}
        />
      </div>
    );
  }
}

export default MapApp;
