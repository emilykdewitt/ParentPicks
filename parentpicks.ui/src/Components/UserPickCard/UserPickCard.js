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
          <p className="card-text userRatingLabel">My Rating:</p>
          <div className="starContainer">
            <BeautyStars
              value={userPick.starRating}
              size="18px"
            />
          </div>
          <p className="review-description"><b>My Review: </b>{userPick.review}</p>
          <div className="bottomOfCardBtnContainer">
          <Link className="btn btn-info pick-card-button mt-auto align-self-end" to={linkToEditReview}>Edit Your Review</Link>
          <Button className="btn btn-danger pick-card-button mt-auto align-self-end" onClick={this.deleteMe}>Delete this Review</Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p className="card-text userRatingLabel">{userPick.userFirstName}'s Rating:</p>
          <div className="pick-star-container">
          <BeautyStars
            value={userPick.starRating}
            size="18px"
          />
          </div>
          <p className="review-description"><b>{userPick.userFirstName}'s Review: </b>{userPick.review}</p>
        </div>
      )
    }
  }

  render() {
    const userPick = {...this.props};
    return (
      <div className="userPickCard card">
          <div className="pickCardBody card-body flex-column" id="activity-card-body">
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