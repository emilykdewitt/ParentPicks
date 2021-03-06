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

// import Auth from '../Components/Auth/Auth';
import NavBar from '../Components/NavBar/NavBar';
import LandingPage from '../Components/LandingPage/LandingPage';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Products from '../Components/Products/Products';
import UserRegistry from '../Components/UserRegistry/UserRegistry';
import UserPicks from '../Components/UserPicks/UserPicks';
import ProductDetail from '../Components/ProductDetail/ProductDetail';
import UserProfile from '../Components/UserProfile/UserProfile';
import CommunityPage from '../Components/CommunityPage/CommunityPage';
import EditUserProfile from '../Components/EditUserProfile/EditUserProfile';
import EditUserFeedback from '../Components/EditUserFeedback/EditUserFeedback';
import AddNewProduct from '../Components/AddNewProduct/AddNewProduct';

import './App.scss';

firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const userId = sessionStorage.getItem('userId')
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: `users/${userId}`, state: { from: props.location } }} />));
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
    userObj: {
      name: ''
    },
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
              <PublicRoute path="/register" 
                authed={authed} 
                component={Register} 
                getCurrentCustomer={this.getCurrentUser}
              />
              <PrivateRoute exact path="/products" authed={authed} component={Products} />
              <PrivateRoute exact path='/products/:id' component={ProductDetail} authed={authed} />
              <PrivateRoute exact path="/userRegistryProduct/:id" authed={authed} component={UserRegistry} />
              <PrivateRoute exact path="/userFeedback/:id" authed={authed} component={UserPicks} />
              <PrivateRoute exact path='/userFeedback/update/:feedbackId' component={EditUserFeedback} authed={authed} />
              <PrivateRoute exact path="/users" authed={authed} component={CommunityPage} />
              <PrivateRoute exact path='/users/:id' component={UserProfile} authed={authed} />
              <PrivateRoute exact path='/users/edit/:id' component={EditUserProfile} authed={authed} />
              <PrivateRoute path='/add-new-product' component={AddNewProduct} authed={authed} />
              <Redirect from="*" to="/landing-page" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
