import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import Fastify from 'fastify';
import mercurius from 'mercurius';

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

const app = Fastify();

app.register(mercurius, { schema });

app.listen({ port: parseInt(process.env.PORT || '') });
