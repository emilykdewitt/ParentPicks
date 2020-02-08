import React from 'react';

import userFeedbackData from '../../DataRequests/userFeedbackData';

const defaultReview = {
    starRating: '',
    review: ''
};

class EditUserFeedback extends React.Component {
    state = {
        newReview: defaultReview,
        existingReview: defaultReview
    }

    componentDidMount() {
        const feedbackId = this.props.match.params.feedbackId;
        userFeedbackData.getFeedbackByFeedbackId(feedbackId)
            .then((reviewResult) => {
                this.setState({ existingReview: reviewResult, newReview: {...reviewResult} })
            })
            .catch((err) => console.error('no review returned', err));
    }

    formSubmit = (e) => {
        e.preventDefault();
        const { newReview } = this.state;
        const reviewId = this.props.match.params.feedbackId;
        const reviewObj = {
            starRating: newReview.starRating,
            review: newReview.review
        };
        userFeedbackData.editUserFeedback(reviewId, reviewObj)
            .then(res => {
                const userId = sessionStorage.getItem('userId');
                // console.error('Review updated', res);
                this.props.history.push(`/userFeedback/user/${userId}`)
            })
            .catch(err => console.error('Review not updated', err));
    };

    handleChange = (e) => {
        const tempReview = { ...this.state.newReview };
        tempReview[e.target.id] = e.target.value;
        this.setState({ newReview: tempReview });
    };

    render() {
        const newReview = this.state.newReview;
        const existingReview = this.state.existingReview;
        return (
            <div>
                <h2>Update Product Review</h2>
                <form className="row justify-content-center new-user-form" onSubmit={this.formSubmit}>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <label htmlFor="starRating" className="newUserFormLabel">Star Rating</label>
                        <input
                            type="number"
                            className="form-control"
                            id="starRating"
                            value={newReview.starRating}
                            onChange={this.handleChange}
                            placeholder={existingReview.starRating}
                            required
                        />
                    </div>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <label htmlFor="review" className="newUserFormLabel">Review</label>
                        <input
                            type="text"
                            className="form-control"
                            id="review"
                            value={newReview.review}
                            onChange={this.handleChange}
                            placeholder={existingReview.review}
                            required
                        />
                    </div>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <button type="submit" className="new-user-btn btn btn-primary btn-lg">Save Updated Review</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditUserFeedback;