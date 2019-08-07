import React, { useReducer, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import queries from '../graphql/queries';
import Menu from './Menu';
import Order from './Order';
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
  const { loading, error, data: { products } } = useQuery(queries);
  const [order, dispatch] = useReducer(reducer, initialState);

  const addItemToOrder = useCallback((key) => {
    const data = products.find(item => item.id === key);
    dispatch({ type: 'ADD_ITEM', payload: { key, data } });
  },
  [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      <Menu items={products} addItemToOrder={addItemToOrder} />
      <Order />
    </OrderContext.Provider>
  );
};

export default App;
