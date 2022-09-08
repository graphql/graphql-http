import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';

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

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(process.env.PORT);
