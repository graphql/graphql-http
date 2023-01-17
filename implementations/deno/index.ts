import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/mod.ts';
import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts';
import { Server } from 'https://deno.land/std@0.148.0/http/server.ts';
import { GraphQLHTTP } from 'https://deno.land/x/gql@1.1.2/mod.ts';

const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
});

const server = new Server({
  handler: GraphQLHTTP({ schema }),
  port: Deno.env.get('PORT'),
});

server.listenAndServe();
