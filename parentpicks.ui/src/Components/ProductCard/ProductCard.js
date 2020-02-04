import React from 'react';
// import { Link } from 'react-router-dom';

import productShape from '../../Helpers/productShape';

import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape.productCardShape,
  }

  render() {
    const product = {...this.props};
    // const addLink = `/add/${product.id}`;
    return (
      <div className="productCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <img className="card-img-top img-fluid" src={product.productImageUrl} alt="tralalala" />
            <h5 className="card-title">{product.name}</h5>
            <h5 className="card-title">{product.brand}</h5>
            <p className="card-text">{product.description}</p>
            <p className="btn btn-info" id={product.id}>View Product Details</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
