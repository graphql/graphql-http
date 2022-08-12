# [1.2.0](https://github.com/enisdenjo/graphql-http/compare/v1.1.0...v1.2.0) (2022-08-12)


### Bug Fixes

* **handler:** `onSubscribe` can return readonly `GraphQLError`s ([5ce6841](https://github.com/enisdenjo/graphql-http/commit/5ce68417493ae6e9c88c024dab496aca1962423c))
* **handler:** Allow empty query string parameter (necessary for persisted operations) ([4eed1d5](https://github.com/enisdenjo/graphql-http/commit/4eed1d50c0d88d92dd8721cb8ed61ef426c53857))
* **handler:** Don't validate if `onSubscribe` returns execution arguments ([17c8007](https://github.com/enisdenjo/graphql-http/commit/17c8007bddc72a020d6daecfb8863a66bb91c65f))
* **handler:** Respond with error if GraphQL execution result is iterable ([d1ffdf7](https://github.com/enisdenjo/graphql-http/commit/d1ffdf7b1e538a28c27f8b8775f49019edd9247d))


### Features

* **handler:** `onSubscribe` can return an `ExecutionResult` for immediate result response ([0dcaf89](https://github.com/enisdenjo/graphql-http/commit/0dcaf89f3ffe86f5b471251eaf8959b350d11a5b))
* **handler:** Expose `getAcceptableMediaType` and `makeResponse` for increased modularity ([ae8ea29](https://github.com/enisdenjo/graphql-http/commit/ae8ea295b8e9a04bd4d146897f2594da79bfa293))
* **handler:** Request may contain a context value ([3a593f8](https://github.com/enisdenjo/graphql-http/commit/3a593f8184d11688b5c5e3f8d9b1624c27a667e7))


### Performance Improvements

* **handler:** Detect non-string query parameter before parsing ([4bc71ee](https://github.com/enisdenjo/graphql-http/commit/4bc71eec1c7f82f35a9b7173aa6e59fc0f2d5031))

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
