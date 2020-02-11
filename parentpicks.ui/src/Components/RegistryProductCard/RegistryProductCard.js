import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import registryProductShape from '../../Helpers/registryProductShape';

import './RegistryProductCard.scss';
import BeautyStars from 'beauty-stars';

class RegistryProductCard extends React.Component {
  static propTypes = {
    registryProduct: registryProductShape.registryProductCardShape,
    deleteRegistryProduct: PropTypes.func.isRequired,
    updateRegistryProduct: PropTypes.func.isRequired
  }

  deleteMe = (e) => {
    e.preventDefault();
    const regProdToDeleteId = this.props.regProdId;
    this.props.deleteRegistryProduct(regProdToDeleteId);
  };

  updateMe = (e) => {
    e.preventDefault();
    const regProdToUpdateId = this.props.regProdId;
    const updatedRegProdObj = { ...this.props };
    updatedRegProdObj.quantityNeeded = this.state.quantityNeeded;
    this.props.updateRegistryProduct(regProdToUpdateId, updatedRegProdObj)
  }

  state = { quantityNeeded: 0 }

  componentDidMount() {
    this.setState({ quantityNeeded: this.props.quantityNeeded });
  }

  makeInputOrNot = () => {
    const userIdOfPage = parseInt(this.props.userId);
    const loggedInUserId = parseInt(sessionStorage.getItem('userId'));
    const product = this.props;
    if (userIdOfPage === loggedInUserId) {
      return (
        <div>
          <label htmlFor="quantityNeeded">Quantity Needed</label>
          <input
            type="number"
            className="form-control"
            id="quantityNeeded"
            placeholder={this.state.quantityNeeded}
            value={this.state.quantityNeeded}
            onBlur={this.updateMe}
            onChange={(e) => this.setState({ quantityNeeded: e.target.value })}
          />
          <Button className="btn btn-primary remove-from-registry-btn" onClick={this.deleteMe}>Remove from Registry</Button>
        </div>
      )
    } else {
      return (
        <p className="card-text">Quantity Needed: {product.quantityNeeded}</p>
      )
    }
  }

  render() {
    const product = { ...this.props };
    return (
      <div className="registryProductCard card col-lg-3 col-md-6 col-sm-12">
          <div className="card-body" id="productCardBody">
            <img className="registryProductCardImage" src={product.productImageUrl} alt="tralalala" />
            <h5 className="registry-product-name">{product.name}</h5>
            <h5 className="registry-product-brand">{product.brand}</h5>
            <div className="registry-star-container">
              <BeautyStars
                value={product.starRating}
                size="18px"
              />
            </div>
          </div>
          {this.makeInputOrNot()}
      </div>
    );
  }
}

export default RegistryProductCard;
