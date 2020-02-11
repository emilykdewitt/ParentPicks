import React from 'react';
import { Link } from 'react-router-dom';

import userShape from '../../Helpers/userShape';

import './UserCard.scss';

class UserCard extends React.Component {
  static propTypes = {
    user: userShape.userShape,
  }

  render() {
    const user = {...this.props};
    const singleUserLink = `/users/${user.id}`;
    return (
      <div className="userProfileCard card col-lg-3 col-md-4 col-sm-6">
          <div className="userCardBody" id="activity-card-body">
            <img className="userProfileCardImg" src={user.profilePhotoUrl} alt="tralalala" />
            <h5 className="user-name">{user.firstName} {user.lastName}</h5>
            <h5 className="user-location">{user.location}</h5>
            <Link className="btn btn-info viewProfileBtn" to={singleUserLink}>View Profile</Link>
          </div>
      </div>
    );
  }
}

export default UserCard;