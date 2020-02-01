import PropTypes from 'prop-types';

const myPickCardShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
    categoryId: PropTypes.number.isRequired,
    productImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    starRating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired
});

export default { myPickCardShape };