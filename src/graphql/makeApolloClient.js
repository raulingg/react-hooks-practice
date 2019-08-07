import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const makeApolloClient = () => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: 'https://burger-queen-graphql-api.herokuapp.com/v1/graphql',
    fetch,
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://burger-queen-graphql-api.herokuapp.com/v1/graphql', {
      reconnect: true,
      timeout: 30000,
    }),
  );

  // chose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
  });

  return client;
};

export default makeApolloClient;
