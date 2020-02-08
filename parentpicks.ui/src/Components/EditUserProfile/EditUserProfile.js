import React from 'react';

import userShape from '../../Helpers/userShape';

import usersData from '../../DataRequests/usersData';

const defaultUser = {
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    profilePhotoUrl: '',
};

class EditUserProfile extends React.Component {
    state = {
        newUser: defaultUser,
        existingUser: defaultUser
    }

    componentDidMount() {
        const userId = sessionStorage.getItem('userId');
        usersData.getUserById(userId)
            .then((userResult) => {
                this.setState({ existingUser: userResult })
            })
            .catch((err) => console.error('no user returned', err));
    }

    formSubmit = (e) => {
        e.preventDefault();
        const { newUser } = this.state;
        const userId = parseInt(sessionStorage.getItem('userId'));
        const userObj = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            location: newUser.location,
            bio: newUser.bio,
            profilePhotoUrl: newUser.profilePhotoUrl,
        };
        usersData.editUserInfo(userId, userObj)
            .then(res => {
                console.error('Profile updated', res);
                this.props.history.push(`/users/${userId}`);
            })
            .catch(err => console.error('Sorry dawg', err));

    };

    handleChange = (e) => {
        const tempUser = { ...this.state.newUser };
        tempUser[e.target.id] = e.target.value;
        this.setState({ newUser: tempUser });
    };

    render() {
        const newUser = this.state.newUser;
        const existingUser = this.state.existingUser;
        return (
            <div>
                <h2>Update Profile Information</h2>
                <form className="row justify-content-center new-user-form" onSubmit={this.formSubmit}>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <label htmlFor="firstName" className="newUserFormLabel">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={newUser.firstName}
                            onChange={this.handleChange}
                            placeholder={existingUser.firstName}
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
                            placeholder={existingUser.lastName}
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
                            placeholder={existingUser.bio}
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
                            placeholder={existingUser.profilePhotoUrl}
                            required
                        />
                    </div>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <button type="submit" className="new-user-btn btn btn-primary btn-lg">Save Profile Info</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditUserProfile;