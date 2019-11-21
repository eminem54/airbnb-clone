import ApolloClient from 'apollo-boost';
import serverAddress from './serverAddress';

const client = new ApolloClient({
  uri: `${serverAddress}/graphql`
});

export const fetchQuery = async gqlQuery => {
  const response = await client.query({
    query: gqlQuery
  });
  return response.data;
};

export default client;
