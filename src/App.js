import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Cities from './Cities';
import Places from './Places';
import Showme from './Showme';
import Map from './Map';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.choosenCity= this.choosenCity.bind(this);
    this.showme = this.showme.bind(this);
    this.populatePlaces= this.populatePlaces.bind(this);
    this.state = {
      dropdownOpen: false,
      nextCity:'cities',
      theCity:[],
      thePlaces:[],
      type:'amusement_park'
    };
  }

  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      nextCity: event.target.innerText
    });
  }

  choosenCity(city) {
    if (city !== this.state.theCity[0]) {
      this.setState({theCity:[city,this.state.type],thePlaces:[]});
    }
  }

  showme(type) {
    if (type !== this.state.type && this.state.theCity.length > 0) {
      this.setState({theCity:[this.state.theCity[0],type],thePlaces:[]});
    }
    else {
      alert('Choose a city first.');
    }
  }

  populatePlaces(places) {
    console.log('the places: ', places);
    this.setState({thePlaces:[ ...this.state.thePlaces, ...places]});
  }

  render() {
    return(
      <Col className="App">
        <Col className="App-header">
        <Row style={{minHeight:'20vh'}}>
          <Col md="6" className="App-welcome">Welcome to Nextrip</Col>
          <Col md="6" className="App-description">a place to visit before your next trip !</Col>
        </Row>
        <Row className="App-cities">
          Choose a city you like to go next&nbsp;&nbsp;
          <Cities nextCity={this.choosenCity}/>
          &nbsp;, show me&nbsp;&nbsp;<Showme type={this.state.theCity[1]} showme={this.showme}/>
        </Row>
        </Col>
        { this.state.theCity.length > 0 ? 
          <Row>
            <Places thePlaces={this.state.thePlaces}/>
          </Row>
          : null }
        { this.state.theCity.length > 0 ? 
          <Map theCity={this.state.theCity} 
               populatePlaces={this.populatePlaces} showme={this.state.type}/> : null }
      </Col>
    );
  }
}

export default App; 
