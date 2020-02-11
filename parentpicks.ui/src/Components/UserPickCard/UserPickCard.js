import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import BeautyStars from 'beauty-stars';

import userPickShape from '../../Helpers/userPickShape';

import './UserPickCard.scss';

class UserPickCard extends React.Component {
  static propTypes = {
    userPick: userPickShape.userPickCardShape,
  }

  state = {
    userId: '',
  }

  deleteMe = (e) => {
    e.preventDefault(); 
    const reviewToDeleteId = this.props.id;
    this.props.deleteFeedback(reviewToDeleteId);
  };

  componentDidMount() {
    const userIdFromProps = this.props.userId;
    this.setState({ userId: userIdFromProps });
  }

  makeInputOrNot = () => {
    const userId = parseInt(this.props.userId);
    const loggedInUserId = parseInt(sessionStorage.getItem('userId'));
    const userPick = this.props;
    const linkToEditReview = `/userFeedback/update/${userPick.id}`;
    if (userId === loggedInUserId) {
      return (
        <div>
          <p className="card-text">My Rating: {userPick.starRating}</p>
          <div className="starContainer">
            <BeautyStars
              value={userPick.starRating}
              size="18px"
            />
          </div>
          <p className="review-description"><b>My Review: </b>{userPick.review}</p>
          <Link className="btn btn-info pick-card-button" to={linkToEditReview}>Edit Your Review</Link>
          <Button className="btn btn-danger pick-card-button" onClick={this.deleteMe}>Delete this Review</Button>
        </div>
      )
    } else {
      return (
        <div>
          <p className="card-text">{userPick.userFirstName}'s Rating: {userPick.starRating}</p>
          <div className="pick-star-container">
          <BeautyStars
            value={userPick.starRating}
            size="18px"
          />
          </div>
          <p className="review-description">{userPick.userFirstName}'s Review: {userPick.review}</p>
        </div>
      )
    }
  }

  render() {
    const userPick = {...this.props};
    return (
      <div className="userPickCard card col-lg-4 col-md-6 col-sm-12">
          <div className="pickCardBody" id="activity-card-body">
            <img className="pickCardImage" src={userPick.productImageUrl} alt="tralalala" />
            <h5 className="pick-card-name">{userPick.name}</h5>
            <h5 className="pick-card-brand">{userPick.brand}</h5>
            {this.makeInputOrNot()}
          </div>
      </div>
    );
  }
}

export default UserPickCard;