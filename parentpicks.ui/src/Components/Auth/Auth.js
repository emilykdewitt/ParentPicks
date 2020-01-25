import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
    state = {
        email: '',
        password: '',
    }

    loginClickEvent = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push('/products');
            })
            .catch();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className="Auth">
                <h1 className="headerAuth"> ParentPicks</h1>
                <h4 className="taglineAuth"> Pick ya fave baby stuff</h4>
                <form className="col-10 col-lg-4 container sign-in-form" onSubmit={this.loginClickEvent}>
                {/* <h3 className="sign-in-header">Already Have An Account?</h3> */}
                <div className="form-group">
                    <label htmlFor="email" className="authFormLabels">Email</label>
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
                    <div className="form-group">
                    <label htmlFor="password" className="authFormLabels">Password</label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="*****"
                    required
                    />
                    </div>
                    <button className="btn loginBtn">Log In</button>
                    <Link className="btn col-8 createAccountBtn" to={'/new-user'}>Create an Account!</Link>
                </form>
            </div>
        )
    }
}


// const baseUrl = 'http://localhost:44377/api';
// // interceptors work by changing the outbound request before the xhr is sent 
// // or by changing the response before it's returned to our .then() method.
// axios.interceptors.request.use(function (request) {
//   const token = sessionStorage.getItem('token');

//   if (token != null) {
//       request.headers.Authorization = `Bearer ${token}`;
//   }

//   return request;
// }, function (err) {
//   return Promise.reject(err);
// });

// const registerUser = () => {
//     firebase.auth().signInWithPopup(provider).then(result => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         let userInfo = {email: result.user.email};
//         result.user.getIdToken().then(token => sessionStorage.setItem('token', token))
//         .then(() => axios.post(`${baseUrl}/users`, userInfo));
//       });


// const loginUser = (user) => {
//   //sub out whatever auth method firebase provides that you want to use.
//   return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
//     //get token from firebase
//     cred.user.getIdToken()
//         //save the token to the session storage
//       .then(token => sessionStorage.setItem('token',token));
//   });
// };

// const logoutUser = () => {
//   return firebase.auth().signOut();
// };

// const getEmail = () => {
//   return firebase.auth().currentUser.email;
// };

// export default {getEmail, loginUser, logoutUser, registerUser};