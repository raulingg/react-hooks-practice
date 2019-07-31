import React, { useReducer, useCallback } from 'react';
import Menu from './Menu';
import Order from './Order';
import products from '../data/products';
import OrderContext from './OrderContext';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { [action.payload.key]: itemAlreadyAdded } = state;
      return itemAlreadyAdded ? state : { ...state, [action.payload.key]: action.payload.data };
    }
    case 'DELETE_ITEM': {
      const { [action.payload.key]: value, ...withoutDeletedOne } = state;
      return withoutDeletedOne;
    }
    default:
      throw new Error();
  }
}

const App = () => {
  const [order, dispatch] = useReducer(reducer, initialState);

  const addItemToOrder = useCallback((key) => {
    const data = products.find(item => item.id === key);
    dispatch({ type: 'ADD_ITEM', payload: { key, data } });
  }, []);

  return (
    <React.Fragment>
      <OrderContext.Provider value={{ order, dispatch }}>
        <Menu items={products} addItemToOrder={addItemToOrder} />
        <Order />
      </OrderContext.Provider>
    </React.Fragment>
  );
};

export default App;
