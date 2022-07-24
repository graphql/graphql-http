<div align="center">
  <br />

  <h3>graphql-http</h3>

  <h6><a href="https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md">GraphQL over HTTP Protocol</a> compliant server and client.</h6>

[![Continuous integration](https://github.com/enisdenjo/graphql-http/workflows/Continuous%20integration/badge.svg)](https://github.com/enisdenjo/graphql-http/actions?query=workflow%3A%22Continuous+integration%22) [![graphql-http](https://img.shields.io/npm/v/graphql-http.svg?label=graphql-http&logo=npm)](https://www.npmjs.com/package/graphql-http)

  <br />
</div>

## Getting started

#### Install

```shell
yarn add graphql-http
```

#### Create a GraphQL schema

```js
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
});
```

#### Start the server

##### With [`http`](https://nodejs.org/api/http.html)

```js
import http from 'http';
import { createHandler } from 'graphql-http';

// Create the GraphQL over HTTP handler
const handler = createHandler({
  schema, // from the previous step
});

// Create a HTTP server using the handler on `/graphql`
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/graphql')) {
    try {
      const [body, init] = await handle({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: await new Promise((resolve) => {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => resolve(body));
        }),
        raw: req,
      });
      res.writeHead(init.status, init.statusText, init.headers).end(body);
    } catch (err) {
      res.writeHead(500).end(err.message);
    }
  }
  return res.writeHead(404).end();
});

server.listen(4000);
console.log('Listening to port 4000');
```

##### With [`http2`](https://nodejs.org/api/http2.html)

_Browsers might complain about self-signed SSL/TLS certificates. [Help can be found on StackOverflow.](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate)_

```shell
$ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

```js
import fs from 'fs';
import http2 from 'http2';
import { createHandler } from 'graphql-http';

// Create the GraphQL over HTTP handler
const handler = createHandler({
  schema, // from the previous step
});

// Create a HTTP/2 server using the handler on `/graphql`
const server = http2.createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  (req, res) => {
    if (req.url.startsWith('/graphql')) {
      try {
        const [body, init] = await handle({
          url: req.url,
          method: req.method,
          headers: req.headers,
          body: await new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => resolve(body));
          }),
          raw: req,
        });
        res.writeHead(init.status, init.statusText, init.headers).end(body);
      } catch (err) {
        res.writeHead(500).end(err.message);
      }
    }
    return res.writeHead(404).end();
  },
);

server.listen(4000);
console.log('Listening to port 4000');
```

##### With [`express`](https://expressjs.com/)

```js
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create an express app serving all methods on `/graphql`
const app = express();
app.use('/graphql', (req, res) => {
  try {
    const [body, init] = await handle({
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: await new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => resolve(body));
      }),
      raw: req,
    });
    res.writeHead(init.status, init.statusText, init.headers).end(body);
  } catch (err) {
    res.writeHead(500).end(err.message);
  }
});

app.listen(4000);
console.log('Listening to port 4000');
```

##### With [`fastify`](https://www.fastify.io/)

```js
import Fastify from 'fastify'; // yarn add fastify
import { createHandler } from 'graphql-http';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create a fastify instance serving all methods on `/graphql`
const fastify = Fastify();
fastify.all('/graphql', (req, res) => {
  try {
    const [body, init] = await handle({
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body, // fastify parses the body for you
      raw: req,
    });
    res.writeHead(init.status, init.statusText, init.headers).end(body);
  } catch (err) {
    res.writeHead(500).end(err.message);
  }
});

fastify.listen(4000);
console.log('Listening to port 4000');
```

## [Documentation](docs/)

Check the [docs folder](docs/) out for [TypeDoc](https://typedoc.org) generated documentation.

## [Want to help?](CONTRIBUTING.md)

File a bug, contribute with code, or improve documentation? Read up on our guidelines for [contributing](CONTRIBUTING.md) and drive development with `yarn test --watch` away!
