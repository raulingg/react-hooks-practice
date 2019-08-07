import './styles.css';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import makeApolloClient from './graphql/makeApolloClient';
import App from './components/App';

const client = makeApolloClient();

const provideClient = component => <ApolloProvider client={client}>{component}</ApolloProvider>;


const app = document.getElementById('app');
ReactDOM.render(provideClient(<App />), app);
