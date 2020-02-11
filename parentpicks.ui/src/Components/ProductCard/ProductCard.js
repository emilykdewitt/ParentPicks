import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Button } from 'reactstrap';

import productShape from '../../Helpers/productShape';

import './ProductCard.scss';

class ProductCard extends React.Component {
  static propTypes = {
    product: productShape.productCardShape,
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
          <p className="product-description"><b>Description: </b>{product.description}</p>
        </div>
        <Link className="btn btn-info productDetailBtn" to={singleProductLink}>View Product Detail</Link>
      </div>
    );
  }
}

export default ProductCard;
