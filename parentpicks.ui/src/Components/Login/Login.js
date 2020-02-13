import React from 'react';
import { Link } from 'react-router-dom';

import './Login.scss'

import authRequests from '../Auth/Auth';
import usersData from '../../DataRequests/usersData';
// import usersData from '../../DataRequests/usersData';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(usersData.getUserByFirebaseKey)
      .then((user) => {
        sessionStorage.setItem('userId', user.id);
        this.props.history.push(`/users/${user.id}`);
      })
      .catch(error => {
        console.error('there was an error in logging in', error);
      });
  };

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className="LoginPageDiv">
        <div id="login-form">
          <h3 className="text-center loginPageHeader">Sign in to your ParentPicks Account</h3>
          <form className="form-horizontal">
          <div className="form-group">
              <div className="text-center">
                <Link className="btn registerForAccountBtn" to="/register">Don't have an account? Click here to register.</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="labelDiv">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              </div>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  autoComplete="off"
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-default loginBtn"
                  onClick={this.loginClickEvent}
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;