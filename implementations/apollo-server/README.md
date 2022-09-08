# GraphQL over HTTP audit

- **72** audits in total
- **42** pass
- **29** warnings (optional)
- **1** errors (required)

## Passing
1. ✅ MUST accept application/json and match the content-type
2. ✅ MUST use utf-8 encoding when responding
3. ✅ MUST accept POST requests
4. ✅ MAY accept application/x-www-form-urlencoded formatted GET requests
5. ✅ MUST NOT allow executing mutations on GET requests
6. ✅ SHOULD respond with 4xx status code if content-type is not supplied on POST requests
7. ✅ MUST accept application/json POST requests
8. ✅ MUST require a request body on POST
9. ✅ SHOULD use 400 status code on missing {query} parameter when accepting application/graphql-response+json
10. ✅ SHOULD use 400 status code on object {query} parameter when accepting application/graphql-response+json
11. ✅ SHOULD use 400 status code on number {query} parameter when accepting application/graphql-response+json
12. ✅ SHOULD use 400 status code on boolean {query} parameter when accepting application/graphql-response+json
13. ✅ SHOULD use 400 status code on array {query} parameter when accepting application/graphql-response+json
14. ✅ SHOULD allow string {query} parameter when accepting application/graphql-response+json
15. ✅ MUST allow string {query} parameter when accepting application/json
16. ✅ SHOULD use 400 status code on object {operationName} parameter when accepting application/graphql-response+json
17. ✅ SHOULD use 400 status code on number {operationName} parameter when accepting application/graphql-response+json
18. ✅ SHOULD use 400 status code on boolean {operationName} parameter when accepting application/graphql-response+json
19. ✅ SHOULD use 400 status code on array {operationName} parameter when accepting application/graphql-response+json
20. ✅ SHOULD allow string {operationName} parameter when accepting application/graphql-response+json
21. ✅ MUST allow string {operationName} parameter when accepting application/json
22. ✅ SHOULD use 400 status code on string {variables} parameter when accepting application/graphql-response+json
23. ✅ SHOULD use 400 status code on number {variables} parameter when accepting application/graphql-response+json
24. ✅ SHOULD use 400 status code on boolean {variables} parameter when accepting application/graphql-response+json
25. ✅ SHOULD allow map {variables} parameter when accepting application/graphql-response+json
26. ✅ MUST allow map {variables} parameter when accepting application/json
27. ✅ SHOULD allow URL-encoded JSON string {variables} parameter in GETs when accepting application/graphql-response+json
28. ✅ MUST allow URL-encoded JSON string {variables} parameter in GETs when accepting application/json
29. ✅ SHOULD use 400 status code on string {extensions} parameter when accepting application/graphql-response+json
30. ✅ SHOULD allow map {extensions} parameter when accepting application/graphql-response+json
31. ✅ MUST allow map {extensions} parameter when accepting application/json
32. ✅ SHOULD use 4xx or 5xx status codes on JSON parsing failure when accepting application/graphql-response+json
33. ✅ SHOULD use 400 status code on JSON parsing failure when accepting application/graphql-response+json
34. ✅ SHOULD use 4xx or 5xx status codes if parameters are invalid when accepting application/graphql-response+json
35. ✅ SHOULD use 400 status code if parameters are invalid when accepting application/graphql-response+json
36. ✅ SHOULD not contain the data entry if parameters are invalid when accepting application/graphql-response+json
37. ✅ SHOULD use 4xx or 5xx status codes on document parsing failure when accepting application/graphql-response+json
38. ✅ SHOULD use 400 status code on document parsing failure when accepting application/graphql-response+json
39. ✅ SHOULD not contain the data entry on document parsing failure when accepting application/graphql-response+json
40. ✅ SHOULD use 4xx or 5xx status codes on document validation failure when accepting application/graphql-response+json
41. ✅ SHOULD use 400 status code on document validation failure when accepting application/graphql-response+json
42. ✅ SHOULD not contain the data entry on document validation failure when accepting application/graphql-response+json

## Warnings
The server _SHOULD_ support these, but is not required.
1. ⚠️ SHOULD accept application/graphql-response+json and match the content-type<br />
  💬 Content-Type header "application/json; charset=utf-8" does not contain "application/graphql-response+json"
2. ⚠️ SHOULD accept */* and use application/graphql-response+json for the content-type<br />
  💬 Content-Type header "application/json; charset=utf-8" does not contain "application/graphql-response+json"
3. ⚠️ SHOULD assume application/graphql-response+json content-type when accept is missing<br />
  💬 Content-Type header "application/json; charset=utf-8" does not contain "application/graphql-response+json"
4. ⚠️ SHOULD use 200 status code with errors field on missing {query} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
5. ⚠️ SHOULD use 200 status code with errors field on object {query} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
6. ⚠️ SHOULD use 200 status code with errors field on number {query} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
7. ⚠️ SHOULD use 200 status code with errors field on boolean {query} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
8. ⚠️ SHOULD use 200 status code with errors field on array {query} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
9. ⚠️ SHOULD use 200 status code with errors field on object {operationName} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
10. ⚠️ SHOULD use 200 status code with errors field on number {operationName} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
11. ⚠️ SHOULD use 200 status code with errors field on boolean {operationName} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
12. ⚠️ SHOULD use 200 status code with errors field on array {operationName} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
13. ⚠️ SHOULD use 400 status code on array {variables} parameter when accepting application/graphql-response+json<br />
  💬 Status code 200 is not 400
14. ⚠️ SHOULD use 200 status code with errors field on string {variables} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
15. ⚠️ SHOULD use 200 status code with errors field on number {variables} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
16. ⚠️ SHOULD use 200 status code with errors field on boolean {variables} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
17. ⚠️ SHOULD use 200 status code with errors field on array {variables} parameter when accepting application/json<br />
  💬 Execution result {"data":{"__typename":"Query"}} does not have a property 'errors'
18. ⚠️ SHOULD use 400 status code on number {extensions} parameter when accepting application/graphql-response+json<br />
  💬 Status code 200 is not 400
19. ⚠️ SHOULD use 400 status code on boolean {extensions} parameter when accepting application/graphql-response+json<br />
  💬 Status code 200 is not 400
20. ⚠️ SHOULD use 400 status code on array {extensions} parameter when accepting application/graphql-response+json<br />
  💬 Status code 200 is not 400
21. ⚠️ SHOULD use 200 status code with errors field on string {extensions} parameter when accepting application/json<br />
  💬 Status code 400 is not 200
22. ⚠️ SHOULD use 200 status code with errors field on number {extensions} parameter when accepting application/json<br />
  💬 Execution result {"data":{"__typename":"Query"}} does not have a property 'errors'
23. ⚠️ SHOULD use 200 status code with errors field on boolean {extensions} parameter when accepting application/json<br />
  💬 Execution result {"data":{"__typename":"Query"}} does not have a property 'errors'
24. ⚠️ SHOULD use 200 status code with errors field on array {extensions} parameter when accepting application/json<br />
  💬 Execution result {"data":{"__typename":"Query"}} does not have a property 'errors'
25. ⚠️ SHOULD use 200 status code on JSON parsing failure when accepting application/json<br />
  💬 Status code 400 is not 200
26. ⚠️ SHOULD use 200 status code if parameters are invalid when accepting application/json<br />
  💬 Status code 400 is not 200
27. ⚠️ SHOULD use 200 status code on document parsing failure when accepting application/json<br />
  💬 Status code 400 is not 200
28. ⚠️ SHOULD use 200 status code on document validation failure when accepting application/json<br />
  💬 Status code 400 is not 200
29. ⚠️ SHOULD not contain the data entry on JSON parsing failure when accepting application/graphql-response+json<br />
  💬 Response body is not valid JSON. Got "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>SyntaxError: Unexpected end of JSON input<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at parse (/home/runner/work/graphql-http/graphql-http/node_modules/body-parser/lib/types/json.js:89:19)<br> &nbsp; &nbsp;at /home/runner/work/graphql-http/graphql-http/node_modules/body-parser/lib/read.js:128:18<br> &nbsp; &nbsp;at AsyncResource.runInAsyncScope (node:async_hooks:203:9)<br> &nbsp; &nbsp;at invokeCallback (/home/runner/work/graphql-http/graphql-http/node_modules/raw-body/index.js:231:16)<br> &nbsp; &nbsp;at done (/home/runner/work/graphql-http/graphql-http/node_modules/raw-body/index.js:220:7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (/home/runner/work/graphql-http/graphql-http/node_modules/raw-body/index.js:280:7)<br> &nbsp; &nbsp;at IncomingMessage.emit (node:events:513:28)<br> &nbsp; &nbsp;at endReadableNT (node:internal/streams/readable:1359:12)<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:82:21)</pre>\n</body>\n</html>\n"

## Errors
The server _MUST_ support these.
1. ❌ MUST accept only utf-8 charset<br />
  💬 Execution result {"data":{"__typename":"Query"}} does not have a property 'errors'
