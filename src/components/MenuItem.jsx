import PropTypes from 'prop-types';
import React from 'react';
import formatter from '../utils';

const MenuItem = ({ item, onClick }) => (
  <div>
    <p>
      {item.name}
      {' '}
      <strong>{formatter.format(item.price)}</strong>
    </p>
    <button type="button" onClick={() => onClick(item.id)}>Add</button>
  </div>
);

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
