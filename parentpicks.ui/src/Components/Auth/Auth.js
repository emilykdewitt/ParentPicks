// import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import usersData from '../../DataRequests/usersData';

// import './Auth.scss';

// const baseUrl = 'http://localhost:44377/api';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const registerUser = (userObj) => {

  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then(cred => {
    //get token from firebase
    return cred.user.getIdToken()
      //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token))
      //save the user to the the api
      .then(() => {
        userObj.firebaseKey = cred.user.uid;
        return usersData.addUserToDatabase(userObj);
    });
  });
}

const loginUser = (user) => {
  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    //get token from firebase
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token));
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getEmail = () => {
  return firebase.auth().currentUser.email;
};

export default {getEmail, loginUser, logoutUser, registerUser};