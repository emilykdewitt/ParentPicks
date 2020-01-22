import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../DataRequests/firebaseConnection';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button className="btn btn-danger">help</button>
      </header>
    </div>
  );
}

export default App;
