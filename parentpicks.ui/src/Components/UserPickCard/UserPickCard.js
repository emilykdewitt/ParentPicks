import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import userPickShape from '../../Helpers/userPickShape';

// import './UserPickCard.scss';

class UserPickCard extends React.Component {
  static propTypes = {
    userPick: userPickShape.userPickCardShape,
  }

  deleteMe = (e) => {
    e.preventDefault(); 
    const reviewToDeleteId = this.props.id;
    this.props.deleteFeedback(reviewToDeleteId);
  };

  makeInputOrNot = () => {
    console.error('these are props', this.props);
    const id = parseInt(this.props.match.params.id);
    console.error('this is the one from props', id);
    const loggedInUserId = parseInt(sessionStorage.getItem('id'));
    console.error('this is the one from session storage', loggedInUserId);
    const userPick = this.props;
    const linkToEditReview = `/userFeedback/update/${userPick.id}`;
    if (id === loggedInUserId) {
      return (
        <div>
          <Link to={linkToEditReview}>Edit Your Review</Link>
          <Button className="btn btn-primary" onClick={this.deleteMe}>Delete this Review</Button>
        </div>
      )
    }
  }

  render() {
    const userPick = {...this.props};
    return (
      <div className="userPickCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <img className="card-img-top img-fluid" src={userPick.productImageUrl} alt="tralalala" />
            <h5 className="card-title">{userPick.name}</h5>
            <h5 className="card-title">{userPick.brand}</h5>
            <p className="card-text">My Rating: {userPick.starRating}</p>
            <p className="card-text">My Review: {userPick.review}</p>
            {this.makeInputOrNot()}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPickCard;