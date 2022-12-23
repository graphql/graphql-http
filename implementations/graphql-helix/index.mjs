import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import {
  getGraphQLParameters,
  processRequest,
  sendResult,
} from 'graphql-helix';
import express from 'express';

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

app.use(express.json());

app.use('/graphql', async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });

  sendResult(result, res);
});

app.listen(process.env.PORT);
