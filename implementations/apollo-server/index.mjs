import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      _: {
        type: GraphQLString,
        resolve: () => '_',
      },
    },
  }),
});

const server = new ApolloServer({ schema });

startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT || '0') },
});
