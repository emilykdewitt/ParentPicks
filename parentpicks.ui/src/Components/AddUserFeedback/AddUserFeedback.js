// get userId
// get productId
// take information from input fields (star rating and review)
// add to userFeedback list
// pop up a 'your feedback has been saved!' alert
// auto-populate with user's existing review? Seems difficult.

import React from 'react';
// import { render } from 'node-sass';
import userFeedbackData from '../../DataRequests/userFeedbackData';

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
        console.error(saveMe);
        userFeedbackData.addUserFeedback(saveMe)
            .then(() => console.error('Success!'))
            .catch(err => console.error('unable to save', err));
    }

    render() {
        const { newUserFeedback } = this.state;
        return (
            <div className="newUserFeedback">
            <h1 className="addUserFeedbackComponentTitle">Add New Activity</h1>
            <form className="new-activity-form" onSubmit={this.formSubmit}>
              <div className="form-group">
                <label htmlFor="starRating">Star Rating:</label>
                <input
                  type="number"
                  className="form-control"
                  id="starRating"
                  placeholder="5"
                  value={newUserFeedback.starRating}
                  onChange={this.starRatingChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="review">Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="review"
                  placeholder="Write your review here."
                  value={newUserFeedback.review}
                  onChange={this.reviewChange}
                />
              </div>
              <button type="submit" className="btn saveNewUserFeedback">Save New User Feedback</button>
            </form>
          </div>
        )
    }
}

export default AddUserFeedback;