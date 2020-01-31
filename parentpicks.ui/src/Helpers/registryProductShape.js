import PropTypes from 'prop-types';

const registryProductCardShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantityNeeded: PropTypes.number.isRequired,
    starRating: PropTypes.number.isRequired,
    productImageUrl: PropTypes.string.isRequired
});

export default { registryProductCardShape };