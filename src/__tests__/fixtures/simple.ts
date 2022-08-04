import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchemaConfig,
} from 'graphql';

export const schemaConfig: GraphQLSchemaConfig = {
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'world',
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      dontChange: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'didntChange',
      },
    },
  }),
};

export const schema = new GraphQLSchema(schemaConfig);
