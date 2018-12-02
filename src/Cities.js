import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

class Cities extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      nextCity:'cities'
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
      nextCity: event.target.innerText
    });
    // window.scrollTo({
    //   top: 300,
    //   behavior: 'smooth'
    // });
    this.props.nextCity(event.target.innerText);
  }

  render() {
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle style={{minWidth:'2vw', fontSize:'2vw'}} caret>
          {this.state.nextCity}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.select}>Singapore</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.select}>Ubud,Bali</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.select}>Kuala Lumpur</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Cities;
