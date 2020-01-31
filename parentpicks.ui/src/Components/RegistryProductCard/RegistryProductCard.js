import React from 'react';
// import { Link } from 'react-router-dom';

import registryProductShape from '../../Helpers/registryProductShape';

// import './ProductCard.scss';

class RegistryProductCard extends React.Component {
  static propTypes = {
    registryProduct: registryProductShape.registryProductCardShape,
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
            <p className="card-text">Rating:{product.starRating}</p>
            <p className="card-text">Quantity Needed:{product.quantityNeeded}</p>
            {/* <Link className="btn btn-info" to={addLink}>Add Activity</Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RegistryProductCard;
