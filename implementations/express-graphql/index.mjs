import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
  query: {
    name: 'Query',
    fields: {
      _: {
        type: GraphQLString,
        resolve: () => '_',
      },
    },
  },
});

const app = express();

app.use('/graphql', graphqlHTTP({ schema }));

app.listen(process.env.PORT);
