import React from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { Button } from 'reactstrap';

import productShape from '../../Helpers/productShape';

import userFeedbackData from '../../DataRequests/userFeedbackData';
import BeautyStars from 'beauty-stars';

import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape.productCardShape,
  }

  state = {
    userFeedbacks: [],
    avgStarRating: '',
  }

  componentDidMount() {
    const productId = this.props.id;
    userFeedbackData.getProductFeedbackByProductId(productId)
      .then((userFeedbackResults) => {
        const numsToAverage = [];
        userFeedbackResults.forEach(feedbackObj => {
          numsToAverage.push(feedbackObj.starRating);
        })
        const getAverage = (array) => {
            if (array.length > 0) {
              return array.reduce((a, b) => (a + b)) / array.length;
            } else return 0;
        }
        const ratingResult = getAverage(numsToAverage);
        this.setState({ userFeedbacks: userFeedbackResults, avgStarRating: ratingResult })
      })
      .catch((err) => console.error('no productReviews returned', err));
  }

  render() {
    const product = { ...this.props };
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="card productCard">
        <div className="card-body" id="productCardBody">
          <img className="productCardImage" src={product.productImageUrl} alt="tralalala" />
          <p className="product-name">{product.name}</p>
          <p className="product-brand">Brand: {product.brand}</p>
          <div className="star-container">
            <BeautyStars
              value={this.state.avgStarRating}
              size="18px"
            />
          </div>
          <p className="product-description"><b>Description: </b>{product.description}</p>
        </div>
        <Link className="btn btn-info productDetailBtn" to={singleProductLink}>View Product Detail</Link>
      </div>
    );
  }
}

export default ProductCard;
