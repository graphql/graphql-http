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
      hey: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'hello',
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
