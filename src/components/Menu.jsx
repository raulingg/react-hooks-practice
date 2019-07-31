import PropTypes from 'prop-types';
import React, { memo } from 'react';
import MenuItem from './MenuItem';

const Menu = ({ items, addItemToOrder }) => (
  <div id="menu-container">
    <h3> Menu </h3>
    { items.length > 0
      ? items.map(item => <MenuItem key={`menuItem-${item.id}`} item={item} onClick={addItemToOrder} />)
      : <p>Add products to your menu</p>
        }
  </div>
);

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  addItemToOrder: PropTypes.func.isRequired,
};

export default memo(Menu);
