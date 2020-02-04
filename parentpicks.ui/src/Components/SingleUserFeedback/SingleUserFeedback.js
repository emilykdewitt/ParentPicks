import React from 'react';

import userFeedbackShape from '../../Helpers/userFeedbackShape';

class SingleUserFeedback extends React.Component {
  static propTypes = {
    userFeedback: userFeedbackShape.userFeedbackShape,
  }

  render() {
    const userFeedback = {...this.props};
    return (
      <div className="productCard">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <p>User Id: {userFeedback.userId}</p>
            <p>Star Rating: {userFeedback.starRating}</p>
            <p>Review: {userFeedback.review}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleUserFeedback;