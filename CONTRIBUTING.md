# How to contribute to graphql-http

## Contributors license agreement

This repository is managed by EasyCLA.
Project participants must sign the free [GraphQL Specification Membership agreement](https://preview-spec-membership.graphql.org) before making a contribution.
You only need to do this one time, and it can be signed by [individual contributors](http://individual-spec-membership.graphql.org/) or their [employers](http://corporate-spec-membership.graphql.org/).

To initiate the signature process please open a PR against this repo.
The EasyCLA bot will block the merge if we still need a membership agreement from you.
You can find [detailed information here](https://github.com/graphql/graphql-wg/tree/main/membership).
If you have issues, please email [operations@graphql.org](mailto:operations@graphql.org).

## Adding implementations

[The implementations folder](implementations) contains setup for server implementations that allows checking their compliance with the [GraphQL over HTTP spec](https://graphql.github.io/graphql-over-http).

Every implementation is expected to contain a `package.json` file with at least the following fields:

```json
{
  "private": true, // prevents warnings
  "name": "implementation-name", // should be equivalent to the directory name
  "url": "https://implementation-name.example", // the official project URL
  "scripts": {
    "start": "node ." | "docker-compose up -d" // depending if the server can be run through node or Docker
  }
}
```

Depending on how your server is run, add it to the appropriate section of [.github/workflows/audits.yml](.github/workflows/audits.yml):

- `node .`: `jobs.javascript.strategy.matrix.workspace`
- `docker-compose up -d`: `jobs.docker.strategy.matrix.workspace`

The script run in `start` is expected to bring up an HTTP server that listens to the port defined in the environment variable `$PORT`.

After adding your directory and `package.json`, run `yarn install` to include the workspace.

## Code formatting

Run the following script to ensure the automatic code formatting is applied:

    yarn run lint:fix
