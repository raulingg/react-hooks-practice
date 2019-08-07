import gql from 'graphql-tag';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products: burger_queen_products {
      id
      name
      type
      price
      product_addons {
        addon {
          id
          name
          price
          type
        }
      }
    }
  }
`;

export default GET_ALL_PRODUCTS;
