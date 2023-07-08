import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchemaConfig,
  GraphQLInt,
} from 'graphql';

export const schemaConfig: GraphQLSchemaConfig = {
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'world',
      },
      num: {
        type: GraphQLInt,
        args: {
          num: {
            type: GraphQLInt,
          },
        },
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
