import React, { useContext, useCallback } from 'react';
import OrderItem from './OrderItem';
import OrderContext from './OrderContext';

const Order = () => {
  const { order, dispatch } = useContext(OrderContext);

  const handleClick = useCallback((key) => {
    dispatch({ type: 'DELETE_ITEM', payload: { key } });
  }, []);

  return (
    <div id="order-container">
      <h3>Order</h3>
      { Object.keys(order).length > 0
        ? Object.values(order).map(item => <OrderItem key={`orderItem-${item.id}`} item={item} onClick={handleClick} />)
        : <p>Add items to your order</p>
      }
    </div>
  );
};

export default Order;
