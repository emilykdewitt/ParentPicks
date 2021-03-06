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
        const linkToEditUser = `/users/edit/${currentUserId}`;
        const linkToUserRegistry = `/userRegistryProduct/${userId}`;
        const linkToUserPicks = `/userFeedback/${userId}`;
        if (userId === currentUserId) {
            return (
                <div className="profilePageDiv">
                    <div>
                        <Link className="btn btn-primary goToRegistryBtn" to={linkToUserRegistry}>Go To Your Registry</Link>
                        <Link className="btn btn-info goToPicksBtn" to={linkToUserPicks}>Go To Your Picks</Link>
                    </div>
                    <Link className="btn btn-danger editProfileBtn" to={linkToEditUser}>Edit Your Profile</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link className="btn btn-primary goToRegistryBtn" to={linkToUserRegistry}>View {this.state.user.firstName}'s Registry</Link>
                    <Link className="btn btn-info goToPicksBtn" to={linkToUserPicks}>View {this.state.user.firstName}'s Picks</Link>
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
                        <p className="user-profile-name">{user.firstName} {user.lastName}</p>
                        <h5 className="user-profile-location">{user.location}</h5>
                        <p className="user-profile-bio">{user.bio}</p>
                    </div>
                    {this.makeButtonOrNot()}
                </div>
            </Container>
        );
    }
}

export default UserProfile;