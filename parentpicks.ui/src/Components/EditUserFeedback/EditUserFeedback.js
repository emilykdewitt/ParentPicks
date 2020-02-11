import React from 'react';

import userFeedbackData from '../../DataRequests/userFeedbackData';
import productsData from '../../DataRequests/productsData';

import './EditUserFeedback.scss';
import BeautyStars from 'beauty-stars';

const defaultReview = {
    starRating: '',
    review: ''
};

class EditUserFeedback extends React.Component {
    state = {
        newReview: defaultReview,
        existingReview: defaultReview,
        productName: '',
    }

    componentDidMount() {
        const feedbackId = this.props.match.params.feedbackId;
        userFeedbackData.getFeedbackByFeedbackId(feedbackId)
            .then((reviewResult) => {
                this.setState({ existingReview: reviewResult, newReview: { ...reviewResult } })
                productsData.getSingleProduct(reviewResult.productId)
                    .then((product) => {
                        const productResultName = product.name;
                        this.setState({ productName: productResultName })
                    })
                    .catch(err => console.error('not able to get matching product name', err));
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
            .then(() => {
                const userId = sessionStorage.getItem('userId');
                this.props.history.push(`/userFeedback/${userId}`)
            })
            .catch(err => console.error('Review not updated', err));
    };

    starChange = (e) => {
        const tempReview = { ...this.state.newReview };
        tempReview.starRating = e;
        this.setState({ newReview: tempReview })
    }

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
                <h3>Update Review for {this.state.productName}</h3>
                <form className="row justify-content-center new-user-form" onSubmit={this.formSubmit}>
                    <div className="form-group col-11 col-md-9 col-lg-7">
                        <label htmlFor="starRating" className="newUserFormLabel">Star Rating</label>
                        <div className="star-container">
                            <BeautyStars
                                id="starRating"
                                value={newReview.starRating}
                                onChange={this.starChange}
                            />
                        </div>
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