import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

const place2googleType = {
  'Amusement Park' : 'amusement_park',
  'Hotels' : 'hotels',
  'Restaurants' : 'cafe'
}

const googleType2place = {
  'amusement_park' : 'Amusement Park',
  'hotels' : 'Hotels',
  'cafe' : 'Restaurants'
}


class Showme extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      showme:'Amusement Park'
    };
  }

  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      showme: event.target.innerText
    });
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    });
    this.props.showme(place2googleType[event.target.innerText]);
  }

  render() {
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle style={{minWidth:'2vw', fontSize:'2vw'}} caret>
          {googleType2place[this.props.type]}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.select}>Amusement Park</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.select}>Hotels</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.select}>Restaurants</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Showme;
