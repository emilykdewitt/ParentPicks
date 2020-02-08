import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import myPickShape from '../../Helpers/myPickShape';

// import './MyPickCard.scss';

class MyPickCard extends React.Component {
  static propTypes = {
    myPick: myPickShape.myPickCardShape,
  }

  deleteMe = (e) => {
    e.preventDefault(); 
    console.error(this.props);
    const reviewToDeleteId = this.props.id;
    this.props.deleteFeedback(reviewToDeleteId);
  };

  render() {
    const myPick = {...this.props};
    const linkToEditReview = `/userFeedback/update/${myPick.id}`;
    return (
      <div className="myPickCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <img className="card-img-top img-fluid" src={myPick.productImageUrl} alt="tralalala" />
            <h5 className="card-title">{myPick.name}</h5>
            <h5 className="card-title">{myPick.brand}</h5>
            <p className="card-text">My Rating: {myPick.starRating}</p>
            <p className="card-text">My Review: {myPick.review}</p>
            <Link to={linkToEditReview}>Edit Your Review</Link>
            <Button className="btn btn-primary" onClick={this.deleteMe}>Delete this Review</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPickCard;