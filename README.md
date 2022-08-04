<div align="center">
  <br />

  <h3>graphql-http</h3>

  <h6><a href="https://graphql.github.io/graphql-over-http">GraphQL over HTTP Protocol</a> compliant server and client.</h6>

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
import { schema } from './previous-step';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create a HTTP server using the handler on `/graphql`
const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/graphql')) {
    return res.writeHead(404).end();
  }

  try {
    const [body, init] = await handler({
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
import { schema } from './previous-step';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create a HTTP/2 server using the handler on `/graphql`
const server = http2.createSecureServer(
  {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem'),
  },
  async (req, res) => {
    if (!req.url.startsWith('/graphql')) {
      return res.writeHead(404).end();
    }

    try {
      const [body, init] = await handler({
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
  },
);

server.listen(4000);
console.log('Listening to port 4000');
```

##### With [`express`](https://expressjs.com/)

```js
import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http';
import { schema } from './previous-step';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create an express app serving all methods on `/graphql`
const app = express();
app.use('/graphql', async (req, res) => {
  try {
    const [body, init] = await handler({
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
import { schema } from './previous-step';

// Create the GraphQL over HTTP handler
const handler = createHandler({ schema });

// Create a fastify instance serving all methods on `/graphql`
const fastify = Fastify();
fastify.all('/graphql', async (req, res) => {
  try {
    const [body, init] = await handler({
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

fastify.listen(4000);
console.log('Listening to port 4000');
```

#### Use the client

```js
import { createClient } from 'graphql-http';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

(async () => {
  let cancel = () => {
    /* abort the request if it is in-flight */
  };

  const result = await new Promise((resolve, reject) => {
    let result;
    cancel = client.subscribe(
      {
        query: '{ hello }',
      },
      {
        next: (data) => (result = data),
        error: reject,
        complete: () => resolve(result),
      },
    );
  });

  expect(result).toEqual({ hello: 'world' });
})();
```

## Recipes

<details id="promise">
<summary><a href="#promise">🔗</a> Client usage with Promise</summary>

```ts
import { ExecutionResult } from 'graphql';
import { createClient, RequestParams } from 'graphql-http';
import { getSession } from './my-auth';

const client = createClient({
  url: 'http://hey.there:4000/graphql',
  headers: async () => {
    const session = await getSession();
    if (!session) return {};
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});

function execute<Data, Extensions>(
  params: RequestParams,
): [request: Promise<ExecutionResult<Data, Extensions>>, cancel: () => void] {
  let cancel!: () => void;
  const request = new Promise<ExecutionResult<Data, Extensions>>(
    (resolve, reject) => {
      let result: ExecutionResult<Data, Extensions>;
      cancel = client.subscribe<Data, Extensions>(params, {
        next: (data) => (result = data),
        error: reject,
        complete: () => resolve(result),
      });
    },
  );
  return [request, cancel];
}

(async () => {
  const [request, cancel] = execute({
    query: '{ hello }',
  });

  // just an example, not a real function
  onUserLeavePage(() => {
    cancel();
  });

  const result = await request;

  expect(result).toBe({ data: { hello: 'world' } });
})();
```

</details>

</details>

<details id="observable">
<summary><a href="#observable">🔗</a> Client usage with <a href="https://github.com/tc39/proposal-observable">Observable</a></summary>

```js
import { Observable } from 'relay-runtime';
// or
import { Observable } from '@apollo/client/core';
// or
import { Observable } from 'rxjs';
// or
import Observable from 'zen-observable';
// or any other lib which implements Observables as per the ECMAScript proposal: https://github.com/tc39/proposal-observable
import { createClient } from 'graphql-http';
import { getSession } from './my-auth';

const client = createClient({
  url: 'http://graphql.loves:4000/observables',
  headers: async () => {
    const session = await getSession();
    if (!session) return {};
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});

const observable = new Observable((observer) =>
  client.subscribe({ query: '{ hello }' }, observer),
);

const subscription = observable.subscribe({
  next: (result) => {
    expect(result).toBe({ data: { hello: 'world' } });
  },
});

// unsubscribe will cancel the request if it is pending
subscription.unsubscribe();
```

</details>

<details id="relay">
<summary><a href="#relay">🔗</a> Client usage with <a href="https://relay.dev">Relay</a></summary>

```ts
import { GraphQLError } from 'graphql';
import {
  Network,
  Observable,
  RequestParameters,
  Variables,
} from 'relay-runtime';
import { createClient } from 'graphql-http';
import { getSession } from './my-auth';

const client = createClient({
  url: 'http://i.love:4000/graphql',
  headers: async () => {
    const session = await getSession();
    if (!session) return {};
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});

function fetch(operation: RequestParameters, variables: Variables) {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return client.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink,
    );
  });
}

export const network = Network.create(fetch);
```

</details>

<details id="apollo-client">
<summary><a href="#apollo-client">🔗</a> Client usage with <a href="https://www.apollographql.com">Apollo</a></summary>

```ts
import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { print, GraphQLError } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-http';
import { getSession } from './my-auth';

class HTTPLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}

const link = new HTTPLink({
  url: 'http://where.is:4000/graphql',
  headers: async () => {
    const session = await getSession();
    if (!session) return {};
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});
```

</details>

<details id="auth">
<summary><a href="#auth">🔗</a> Server handler usage with authentication</summary>

Authenticate the user within `graphql-http` during GraphQL execution context assembly. This is a approach is less safe compared to early authentication ([see early authentication in Node](#auth-node-early)) because some GraphQL preparations or operations are executed even if the user is not unauthorized.

```js
import { createHandler } from 'graphql-http';
import {
  schema,
  getUserFromCookies,
  getUserFromAuthorizationHeader,
} from './my-graphql';

const handler = createHandler({
  schema,
  context: async (req) => {
    // process token, authenticate user and attach it to your graphql context
    const userId = await getUserFromCookies(req.headers.cookie);
    // or
    const userId = await getUserFromAuthorizationHeader(
      req.headers.authorization,
    );

    // respond with 401 if the user was not authenticated
    if (!userId) {
      return [null, { status: 401, statusText: 'Unauthorized' }];
    }

    // otherwise attach the user to the graphql context
    return { userId };
  },
});
```

</details>

<details id="context">
<summary><a href="#context">🔗</a> Server handler usage with custom context value</summary>

```js
import { createHandler } from 'graphql-http';
import { schema, getDynamicContext } from './my-graphql';

const handler = createHandler({
  schema,
  context: async (req, args) => {
    return getDynamicContext(req, args);
  },
  // or static context by supplying the value direcly
});
```

</details>

<details id="custom-exec">
<summary><a href="#custom-exec">🔗</a> Server handler usage with custom execution arguments</summary>

```js
import { parse } from 'graphql';
import { createHandler } from 'graphql-http';
import { getSchemaForRequest, myValidationRules } from './my-graphql';

const handler = createHandler({
  onSubscribe: async (req, params) => {
    const schema = await getSchemaForRequest(req);

    const args = {
      schema,
      operationName: params.operationName,
      document: parse(params.query),
      variableValues: params.variables,
    };

    return args;
  },
});
```

</details>

<details id="auth-node-early">
<summary><a href="#auth-node-early">🔗</a> Server handler usage in Node with early authentication (recommended)</summary>

Authenticate the user early, before reaching `graphql-http`. This is the recommended approach because no GraphQL preparations or operations are executed if the user is not authorized.

```js
import { createHandler } from 'graphql-http';
import {
  schema,
  getUserFromCookies,
  getUserFromAuthorizationHeader,
} from './my-graphql';

const handler = createHandler({
  schema,
  context: async (req) => {
    // user is authenticated early (see below), simply attach it to the graphql context
    return { userId: req.raw.userId };
  },
});

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/graphql')) {
    return res.writeHead(404).end();
  }

  try {
    // process token, authenticate user and attach it to the request
    req.userId = await getUserFromCookies(req.headers.cookie);
    // or
    req.userId = await getUserFromAuthorizationHeader(
      req.headers.authorization,
    );

    // respond with 401 if the user was not authenticated
    if (!req.userId) {
      return res.writeHead(401, 'Unauthorized').end();
    }

    const [body, init] = await handler({
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

server.listen(4000);
console.log('Listening to port 4000');
```

</details>

## [Documentation](docs/)

Check the [docs folder](docs/) out for [TypeDoc](https://typedoc.org) generated documentation.

## [Want to help?](CONTRIBUTING.md)

File a bug, contribute with code, or improve documentation? Read up on our guidelines for [contributing](CONTRIBUTING.md) and drive development with `yarn test --watch` away!
