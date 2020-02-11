import React from 'react';

import userFeedbackShape from '../../Helpers/userFeedbackShape';

import './SingleUserFeedback.scss';
import BeautyStars from 'beauty-stars';

class SingleUserFeedback extends React.Component {
  static propTypes = {
    userFeedback: userFeedbackShape.userFeedbackShape,
  }

  render() {
    const userFeedback = { ...this.props };
    return (
      <div className="feedbackProductCard card">
        <div className="card-body" id="feedback-card-body">
          <p className="">User Id: {userFeedback.userId}</p>
          <div className="feedback-star-container">
            <BeautyStars
              value={userFeedback.starRating}
              size="18px"
            />
          </div>
          <p className="">Star Rating: {userFeedback.starRating}</p>
          <p className="">Review: {userFeedback.review}</p>
        </div>
      </div>
    );
  }
}

export default SingleUserFeedback;