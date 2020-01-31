import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import './Navbar.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state= {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/products'>Products</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/my-registry'>My Registry</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink tag={RRNavLink} to='/picks'>Picks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/community'>Community</NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink onClick={this.logMeOut}>Log out</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
          <NavLink tag={RRNavLink} to='/Login'>Log In</NavLink>
          </NavItem>
        </Nav>
      );
    };
    return (
      <div className="MyNavbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand className="navbarBrand" href="/">ParentPicks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;