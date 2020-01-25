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

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const defaultUser = {
  id: '',
  dateCreated: '',
  firebaseKey: '',
  firstName: '',
  lastName: '',
  location: '',
  email: '',
  bio: '',
}

class App extends React.Component {
  state = {
    authed: false,
    currentUser: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getCurrentUser = (tempCurrentUser) => {
    this.setState({ currentUser: tempCurrentUser });
    return this.state.currentUser;
  }

  getInitialUser = () => {
    return {
      user: defaultUser
    }
  }

  updateUser = (newUser) => {
    this.setState({ user: newUser });
  }

  logout = () => {
    this.setState({ authenticated: false });
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <NavBar 
            authed={authed}
            logout={this.logout}
          />
          <React.Fragment>
            <Switch>
              <PublicRoute path="/landing-page" component={LandingPage} authed={authed} />
              <PublicRoute path="/login" authed={authed} component={Login} />
              <PublicRoute path="/register" authed={authed} component={Register} />
              <PrivateRoute path="/products" authed={authed} component={Products} />
              <PrivateRoute path="/registry" authed={authed} component={Registry} />
              <PrivateRoute path="/picks" authed={authed} component={Picks} />
              <PrivateRoute path="/community" authed={authed} component={Community} />
              <Redirect from="*" to="/auth" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
