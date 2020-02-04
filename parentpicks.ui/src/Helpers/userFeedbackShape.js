import PropTypes from 'prop-types';

const userFeedbackShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  starRating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
});

export default { userFeedbackShape };