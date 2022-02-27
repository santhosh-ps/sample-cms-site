import { split, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const getGraphqlClient = () => {

    const wsLink = new WebSocketLink({
        uri: "wss://perfect-redbird-87.hasura.app/v1/graphql"
    });
    const httpLink = new HttpLink({
      uri: 'https://perfect-redbird-87.hasura.app/v1/graphql'
    });
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache()
    });
}
