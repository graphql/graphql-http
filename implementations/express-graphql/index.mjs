import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

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

const app = express();

app.use('/graphql', graphqlHTTP({ schema }));

app.listen(process.env.PORT);
