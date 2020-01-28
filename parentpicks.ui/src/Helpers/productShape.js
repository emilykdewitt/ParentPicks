import PropTypes from 'prop-types';

const productCardShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  productImageUrl: PropTypes.string.isRequired,
});

export default { productCardShape };