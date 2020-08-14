import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:4000/"
});

const client = new ApolloClient({
    cache,
    link
});

client
    .query({
        query: gql`
      query GetLaunch {
        feed{
    id
    url
  }
      }
    `
    })
    .then(result => console.log(result));
