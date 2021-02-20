import "babel-polyfill";
// import cssVars from "css-vars-ponyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./_index.scss";

import * as serviceWorker from "./serviceWorker";
import App from "./app/App";
//Configure URQL
/* import { createClient, Provider } from 'urql'; */

//Configure ApolloClient
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from 'apollo-link-http';
const { API } = process.env;
/* import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities'; */

//import { onError } from '@apollo/client/link/error';
//import { logoutUser } from './app/redux/actions/UserActions';
// 1
/* import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory' */
// 2
/* const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
}) */

const httpLink = createHttpLink({
    //uri: "http://localhost:4000",
    uri: "https://my-shipman.com/api"
});
/*const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
});
 const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/`,
    options: {
        reconnect: true
    }
}); */

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwt_token');
    //console.log(token);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
/* const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) logout();
  }) */

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    })
    //cache: new InMemoryCache()
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
/* const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
); */

//const client = createClient({ url: 'http://localhost:4000' });
// cssVars();

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root"));
/* ReactDOM.render(
    <App />,
    document.getElementById("root")); */

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
