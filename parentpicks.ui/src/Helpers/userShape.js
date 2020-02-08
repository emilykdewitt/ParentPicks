import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  firebaseKey: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  profilePhotoUrl: PropTypes.string.isRequired
});

export default { userShape };