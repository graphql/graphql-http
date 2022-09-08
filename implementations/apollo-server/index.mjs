import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import { ApolloServer } from 'apollo-server';

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

server.listen({ port: process.env.PORT });
