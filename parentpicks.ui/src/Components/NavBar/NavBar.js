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

  state = {
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
      const userId = sessionStorage.getItem('userId');
      const myRegistryLink = `/userRegistryProduct/${userId}`
      const myPicksLink = `/userFeedback/${userId}`
      const myProfileLink = `/users/${userId}`
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to={myProfileLink}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/products'>Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={myRegistryLink}>My Registry</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={myPicksLink}>My Picks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/users'>Community</NavLink>
            </NavItem>
            {/* <NavItem>
            <NavLink tag={RRNavLink} to='/users/1003'>My Profile</NavLink>
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
        <Navbar className="navBarBrandColor" color="dark" dark expand="md">
          <NavbarBrand className="navbarBrand" href="/">
            <img
              src="https://raw.githubusercontent.com/emilykdewitt/ParentPicks/master/parentpicks.ui/public/Images/parentpickslogo3.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Parent Picks logo"
            />
          </NavbarBrand>
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