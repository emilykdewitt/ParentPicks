import React from 'react';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

// import userShape from '../../Helpers/userShape';
import usersData from '../../DataRequests/usersData';

import './UserProfile.scss';

const defaultUser = {
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    profilePhotoUrl: '',
};

class UserProfile extends React.Component {
    state = {
        user: defaultUser,
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        usersData.getUserById(userId)
        .then((userResult) => {
            this.setState({ user: userResult })
        })
        .catch((err) => console.error('no user returned', err));
    }

    makeButtonOrNot = () => {
        const userId = this.state.user.id;
        const currentUserId = parseInt(sessionStorage.getItem('userId'));
        const linkToEditUser = `/users/edit/${currentUserId}`
        if (userId === currentUserId) {
            return (
                <div>
                    <Link to={linkToEditUser}>Click here to Edit Your Profile</Link>
                </div>
            )
        }
    }

    render() {
        const { user } = this.state;

        return (
            <Container>
                <div className="userProfile">
                    <div className="image-name-location-div">
                        <img className="user-profile-image" src={user.profilePhotoUrl} alt="face"></img>
                        <h2 className="user-profile-name">{user.firstName} {user.lastName}</h2>
                        <h5 className="user-profile-location">{user.location}</h5>
                        <p>Bio: {user.bio}</p>
                    </div>
                    {this.makeButtonOrNot()}
                </div>
            </Container>
        );
    }
}

export default UserProfile;