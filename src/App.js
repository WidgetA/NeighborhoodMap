import React from 'react';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Locations from './location.json'
import * as API from './Api.js'

const MapWithAMarker = withScriptjs(withGoogleMap(props => {
  return(
    <GoogleMap
      defaultZoom={13}
      defaultCenter={props.center}
    >
    
    {
      props.markers.map(marker => {
        const index = props.markers.findIndex((n) => n===marker)
        return(
          <Marker
            position = {marker}
            onClick={() => props.handleToggleOpen(index)}
          >
            {
              (() =>{
                if(props.windowBoxOpen[index]) {
                  return(
                    <InfoWindow onCloseClick={() => props.handleToggleClose(index)}>
                      <div>
                        <h3>{props.locationList[index]}</h3>
                        {props.trafficList[index]}
                      </div>
                    </InfoWindow>
                    )
                }
              })()
            }
          </Marker>
          )
      })
    }   
    </GoogleMap>
    )
}));


class MapApp extends React.Component {

  state = {
    markers: Locations.locations,
    center: Locations.center,
    locationBar: true,
    locationList: [],
    windowBoxOpen: [],
    trafficList:[]
  }

  OriginState = {}

  componentWillMount() {
    const result = [];
    const openList = [];
    const traffic = [];
    for (let i = 0; i < this.state.markers.length; i++) {
      API.getInfo(this.state.markers[i].lng, this.state.markers[i].lat).then(data => {
        result.push(data)
        openList.push(false)
        this.setState({locationList: result}, ()=>{this.OriginState=this.state})
        this.setState({windowBoxOpen: openList}, ()=>{this.OriginState=this.state})
      })
      API.getTraffic(this.state.markers[i].lng, this.state.markers[i].lat).then(data =>{
        console.log(data)
        traffic.push(data)
        this.setState({trafficList: traffic}, ()=>{this.OriginState=this.state})
      })
    }
  }

  handleClick() {
    this.setState({locationBar: !this.state.locationBar})
  }

  handleToggleOpen(index){
    let l = this.state.windowBoxOpen
    l[index] = true
    this.setState({windowBoxOpen:l})
  }
  
  handleToggleClose(index){
    let l = this.state.windowBoxOpen
    l[index] = false
    this.setState({windowBoxOpen:l})
  }

  handleFilter(){
    const input = this.inputTextbox.value
    const indexList = []
    if (input) {
      for (let i = 0; i < this.state.locationList.length; i++) {
        if (this.state.locationList[i].match(input +'+')) {
          indexList.push(i)
        } else ;
      }
      this.setState({locationList: this.state.locationList.filter(item => {
        return indexList.indexOf(this.state.locationList.indexOf(item)) !== -1
      })})
      this.setState({markers: this.state.markers.filter(item => {
        return indexList.indexOf(this.state.markers.indexOf(item)) !== -1
      })})
      this.setState({windowBoxOpen: () =>{
        const boxList = []
        for (let i = 0; i < indexList.length; i++) {
          boxList.push(false)
        }
        return boxList
      }})
    } else {
      this.setState(this.OriginState)
      console.log(this.OriginState)
    } 
  }

  render() {
    return (
      <div className="App">
        {
          this.state.locationBar ? (
            <div id="sidebarlist">
              <h2>Locations</h2>
              <button className="searchButton" onClick={this.handleFilter.bind(this)}>Filter</button>
              <div className="search-input">
                <input type="text" placeholder="Input a Location" ref={input => this.inputTextbox = input}/>
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
          windowBoxOpen={this.state.windowBoxOpen}
          handleToggleOpen={this.handleToggleOpen.bind(this)}
          handleToggleClose={this.handleToggleClose.bind(this)}
          locationList={this.state.locationList}
          trafficList={this.state.trafficList}
        />
      </div>
    );
  }
}

export default MapApp;
