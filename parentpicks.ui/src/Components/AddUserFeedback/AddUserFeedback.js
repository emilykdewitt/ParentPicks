import React from 'react';
// import { render } from 'node-sass';
import userFeedbackData from '../../DataRequests/userFeedbackData';

import './AddUserFeedback.scss';

const defaultUserFeedback = {
    userId: '',
    productId: '',
    starRating: '',
    review: '',
};

class AddUserFeedback extends React.Component {
    state = {
        newUserFeedback: defaultUserFeedback
    }

    // componentDidMount() {

    // };

    formFieldStringState = (fieldName, e) => {
        const tempUserFeedback = { ...this.state.newUserFeedback };
        tempUserFeedback[fieldName] = e.target.value;
        this.setState({ newUserFeedback: tempUserFeedback });
    }
    
    starRatingChange = e => this.formFieldStringState('starRating', e);

    reviewChange = e => this.formFieldStringState('review', e);

    formSubmit = (e) => {
        e.preventDefault();
        const saveMe = { ...this.state.newUserFeedback };
        saveMe.userId = sessionStorage.getItem('userId');
        saveMe.productId = this.props.productId;
        userFeedbackData.addUserFeedback(saveMe)
            .then(() => console.error('Success!'))
            .catch(err => console.error('unable to save', err));
    }

    render() {
        const { newUserFeedback } = this.state;
        return (
            <div className="newUserFeedback">
            <p className="addUserFeedbackComponentTitle leaveReviewTitle">Leave a Review</p>
            <form className="new-activity-form" onSubmit={this.formSubmit}>
              <div className="form-group reviewInputGroup">
                <label htmlFor="starRating" className="reviewInputLabel">Star Rating:</label>
                <input
                  type="number"
                  className="form-control"
                  id="starRating"
                  placeholder="5"
                  value={newUserFeedback.starRating}
                  onChange={this.starRatingChange}
                />
              </div>
              <div className="form-group reviewInputGroup">
                <label htmlFor="review" className="reviewInputLabel">Review</label>
                <input
                  className="review-text-input-field"
                  type="text"
                  className="form-control"
                  id="review"
                  placeholder="Write your review here."
                  value={newUserFeedback.review}
                  onChange={this.reviewChange}
                />
              </div>
              <div className="userFeedbackBtnContainer">
                <button type="submit" className="btn btn-info saveNewUserFeedbackBtn">Save My Review</button>
              </div>
            </form>
          </div>
        )
    }
}

export default AddUserFeedback;