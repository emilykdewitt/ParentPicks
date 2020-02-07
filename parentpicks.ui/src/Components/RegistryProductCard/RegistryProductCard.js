import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import registryProductShape from '../../Helpers/registryProductShape';
// import userRegistryProductData from '../../DataRequests/userRegistryProductData';

// import './ProductCard.scss';

class RegistryProductCard extends React.Component {
  static propTypes = {
    registryProduct: registryProductShape.registryProductCardShape,
    deleteRegistryProduct: PropTypes.func.isRequired,
  }

  deleteMe = (e) => {
    e.preventDefault();
    const regProductToDeleteId = this.props.productId;
    const deleteFromRegistry = this.props.deleteRegistryProduct;
    deleteFromRegistry(regProductToDeleteId);
  };

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
            <p className="card-text">Rating:{product.starRating}</p>
            <p className="card-text">Quantity Needed:{product.quantityNeeded}</p>
            <Button className="btn btn-primary" onClick={this.deleteMe}>Remove from Registry</Button>
            {/* <Link className="btn btn-info" to={addLink}>Add Activity</Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistryProductCard;
