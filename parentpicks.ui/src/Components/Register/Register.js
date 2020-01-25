import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from '../../helpers/data/usersData';

import './NewUser.scss';

const defaultUser = {
  email: '',
  dateCreated: '',
  firebaseKey: '',
  firstName: '',
  lastName: '',
  location: '',
  bio: '',
};

class NewUser extends React.Component {
  state = {
    email: '',
    password: '',
    newUser: defaultUser,
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const saveMe = { ...this.state.newUser };
        saveMe.firebaseKey = firebase.auth().currentUser.uid;
        saveMe.dateCreated = moment();
        usersData.addUserToDatabase(saveMe)
          .then(() => this.props.history.push('/home'))
          .catch(err => console.error('unable to save', err));
      })
      .catch(err => console.error('trouble logging in with email', err));
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { newUser, email, password } = this.state;
    return (
      <div className="NewUserPage container">
        <h1 className="join-header">Join ParentPicks!</h1>
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
            <label htmlFor="name" className="newUserFormLabel">First Name</label>
            <input
            type="text"
            className="form-control"
            id="name"
            value={newUser.firstName}
            onChange={this.formFieldStringState}
            placeholder="John"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="name" className="newUserFormLabel">Last Name</label>
            <input
            type="text"
            className="form-control"
            id="name"
            value={newUser.lastName}
            onChange={this.formFieldStringState}
            placeholder="Doe"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="name" className="newUserFormLabel">Location</label>
            <input
            type="text"
            className="form-control"
            id="location"
            value={newUser.location}
            onChange={this.formFieldStringState}
            placeholder="Doe"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <label htmlFor="name" className="newUserFormLabel">Bio</label>
            <input
            type="text"
            className="form-control"
            id="bio"
            value={newUser.bio}
            onChange={this.formFieldStringState}
            placeholder="Expecting first child in June 2020!"
            required
            />
          </div>
          <div className="form-group col-11 col-md-9 col-lg-7">
            <button type="submit" className="new-user-btn btn btn-primary btn-lg">Join ParentPicks</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewUser;

