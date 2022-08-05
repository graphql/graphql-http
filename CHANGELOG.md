# [1.1.0](https://github.com/enisdenjo/graphql-http/compare/v1.0.0...v1.1.0) (2022-08-05)


### Bug Fixes

* `isResponse` correctly asserts even if body is null ([102de6d](https://github.com/enisdenjo/graphql-http/commit/102de6d4023b35dc133c0cca99b92dfee36f9ebe))
* Different types for request and response headers ([9e91141](https://github.com/enisdenjo/graphql-http/commit/9e911414084f34d57b62527eeaede9042d27caec))
* **handler:** `context` option can return a response ([86c28d1](https://github.com/enisdenjo/graphql-http/commit/86c28d1bc40dc06bf6fbb3e71c7440968c4c2c17))
* **handler:** Match status text with status code ([f07454d](https://github.com/enisdenjo/graphql-http/commit/f07454d3a367fd62bd220f9810c1a4cc4ee6e439))
* **handler:** More details about parse error ([3306cae](https://github.com/enisdenjo/graphql-http/commit/3306caef07ac7d3a23deabae457b77051ae23636))


### Features

* **client:** `url` option function with request params as argument ([99d9086](https://github.com/enisdenjo/graphql-http/commit/99d90866bddb074587ae4a2bfe5a55c152f5014a))
* **handler:** `onSubscribe` option can return an array of GraphQL errors ([ebd91ad](https://github.com/enisdenjo/graphql-http/commit/ebd91ad9e178a1d3dca26c512e339502f8519381))
* **handler:** Custom GraphQL `getOperationAST` option ([f4a2aab](https://github.com/enisdenjo/graphql-http/commit/f4a2aab9e85300fe4a6fddab69a6b73d256e9cf5))
* **handler:** Custom GraphQL `parse` option ([6ef4c57](https://github.com/enisdenjo/graphql-http/commit/6ef4c572d52024d0b45303a2fd97e2da745b711d))

# 1.0.0 (2022-08-04)


### Features

* Implement client ([#3](https://github.com/enisdenjo/graphql-http/issues/3)) ([c1b4c79](https://github.com/enisdenjo/graphql-http/commit/c1b4c798c0d869085d9c6b0a2119ce807c00471b))
* Implement server handler ([#2](https://github.com/enisdenjo/graphql-http/issues/2)) ([99b888b](https://github.com/enisdenjo/graphql-http/commit/99b888b9ff0194f26fa1e7b056ed28feda88d29c))
