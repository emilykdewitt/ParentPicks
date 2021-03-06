import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';

import authRequests from '../Auth/Auth';

import './Register.scss';

const defaultUser = {
  email: '',
  password: '',
  dateCreated: '',
  firebaseKey: '',
  firstName: '',
  lastName: '',
  location: '',
  bio: '',
  profilePhotoUrl: '',
};

class Register extends React.Component {
  state = {
    newUser: defaultUser,
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { newUser } = this.state;
    const currentTime = moment();
    const userObj = {
      dateCreated: currentTime,
      email: newUser.email,
      password: newUser.password,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      location: newUser.location,
      bio: newUser.bio,
      profilePhotoUrl: newUser.profilePhotoUrl,
    };
    authRequests
      .registerUser(userObj)
      .then((user) => {
        sessionStorage.setItem('userId',user.id);
        this.props.history.push(`/users/${user.id}`);
      })
      .catch(error => {
        console.error('there was an error with registration', error);
      });
  };

  handleChange = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ newUser: tempUser});
  };

  render() {
    const { newUser, email, password } = this.state;
    return (
      <div className="newUserPage container">
        <h1 className="join-header">Create ParentPicks Account</h1>
        <form className="row justify-content-center new-user-form" onSubmit={this.formSubmit}>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="email" className="newUserFormLabel">Email</label>
            <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={this.handleChange}
            placeholder="JohnDoe@greenup.com"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="password" className="newUserFormLabel">Password</label>
            <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={this.handleChange}
            placeholder="********"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="firstName" className="newUserFormLabel">First Name</label>
            <input
            type="text"
            className="form-control"
            id="firstName"
            value={newUser.firstName}
            onChange={this.handleChange}
            placeholder="John"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="lastName" className="newUserFormLabel">Last Name</label>
            <input
            type="text"
            className="form-control"
            id="lastName"
            value={newUser.lastName}
            onChange={this.handleChange}
            placeholder="Doe"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="location" className="newUserFormLabel">Location</label>
            <input
            type="text"
            className="form-control"
            id="location"
            value={newUser.location}
            onChange={this.handleChange}
            placeholder="Nashville, Tennessee"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="bio" className="newUserFormLabel">Bio</label>
            <input
            type="text"
            className="form-control"
            id="bio"
            value={newUser.bio}
            onChange={this.handleChange}
            placeholder="Expecting first child in June 2020!"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="profilePhotoUrl" className="newUserFormLabel">Profile Photo URL</label>
            <input
            type="text"
            className="form-control"
            id="profilePhotoUrl"
            value={newUser.profilePhotoUrl}
            onChange={this.handleChange}
            placeholder="https://google.com/pictureofme.jpg"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <button type="submit" className="register-new-user-btn btn btn-primary btn-lg">Create Account</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;

