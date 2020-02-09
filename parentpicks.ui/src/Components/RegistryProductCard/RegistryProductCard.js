import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import registryProductShape from '../../Helpers/registryProductShape';

// import './ProductCard.scss';

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
          <Button className="btn btn-primary" onClick={this.deleteMe}>Remove from Registry</Button>
        </div>
      )} else {
        return (
          <p className="card-text">Quantity Needed: {product.quantityNeeded}</p>
        )
      }
  }

  render() {
    const product = { ...this.props };
    return (
      <div className="productCard col-lg-4 col-md-6 col-sm-12">
        <div className="card">
          <div className="card-body" id="activity-card-body">
            <img className="card-img-top img-fluid" src={product.productImageUrl} alt="tralalala" />
            <h5 className="card-title">{product.name}</h5>
            <h5 className="card-title">{product.brand}</h5>
            <p className="card-text">Rating: {product.starRating}</p>
          </div>
          {this.makeInputOrNot()}
        </div>
      </div>
    );
  }
}

export default RegistryProductCard;
