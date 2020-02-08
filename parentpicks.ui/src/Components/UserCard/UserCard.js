import React from 'react';
import { Link } from 'react-router-dom';

import userShape from '../../Helpers/userShape';

// import './ProductCard.scss';

class UserCard extends React.Component {
  static propTypes = {
    user: userShape.userShape,
  }

  render() {
    const user = {...this.props};
    const singleUserLink = `/users/${user.id}`;
    return (
      <div className="productCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <img className="card-img-top img-fluid" src={user.profilePhotoUrl} alt="tralalala" />
            <h5 className="card-title">{user.firstName} {user.lastName}</h5>
            <h5 className="card-title">{user.location}</h5>
            <Link className="btn btn-info" to={singleUserLink}>View Profile</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;