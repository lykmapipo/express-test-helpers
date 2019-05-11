# [@lykmapipo/express-test-helpers](https://github.com/lykmapipo/express-test-helpers#readme) *0.7.0*

> Sensible test helpers for express


### lib/index.js


#### clear() 

Clear notFound, errorHandler and route handlers






##### Examples

```javascript

const { clear } = require('@lykmapipo/express-test-helpers');

beforeEach(() => clear());
```


##### Returns


- `Void`



#### testRequest() 

Create generic test request with applied defaults






##### Examples

```javascript

const { testRequest } = require('@lykmapipo/express-test-helpers');

const request = testRequest();
request.get('/users')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest request



#### testOption(path) 

Create http option test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |




##### Examples

```javascript

const { testOption } = require('@lykmapipo/express-test-helpers');

testOption('/v1/users')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });

testOption('/v1/users/1')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest option request



#### testHead(path) 

Create http option test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |




##### Examples

```javascript

const { testHead } = require('@lykmapipo/express-test-helpers');

testHead('/v1/users')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });

testHead('/v1/users/1')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest option request



#### testGet(path) 

Create http get test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |




##### Examples

```javascript

const { testGet } = require('@lykmapipo/express-test-helpers');

testGet('/v1/users')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });

testGet('/v1/users/1')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest get request



#### testPost(path[, body&#x3D;{}]) 

Create http get test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |
| body&#x3D;{} | `Object`  | valid response body under test | *Optional* |




##### Examples

```javascript

const { testPost } = require('@lykmapipo/express-test-helpers');

testPost('/v1/users', { name: 'John Doe', ... })
 .expect(201)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest post request



#### testPatch(path[, body&#x3D;{}]) 

Create http patch test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |
| body&#x3D;{} | `Object`  | valid response body under test | *Optional* |




##### Examples

```javascript

const { testPatch } = require('@lykmapipo/express-test-helpers');

testPatch('/v1/users/1', { name: 'John Doe', ... })
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest patch request



#### testPut(path[, body&#x3D;{}]) 

Create http put test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |
| body&#x3D;{} | `Object`  | valid response body under test | *Optional* |




##### Examples

```javascript

const { testPut } = require('@lykmapipo/express-test-helpers');

testPut('/v1/users/1', { name: 'John Doe', ... })
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest put request



#### testDelete(path) 

Create http delete test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |




##### Examples

```javascript

const { testDelete } = require('@lykmapipo/express-test-helpers');

testDelete('/v1/users/1')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest delete request



#### testMiddleware(path) 

Create test requests for a middleware




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `Function`  | valid express middleware | &nbsp; |




##### Examples

```javascript

const { testMiddleware } = require('@lykmapipo/express-test-helpers');

const { testGet } = testMiddleware(ipFilter);

testGet()
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Object`  valid supertest requests



#### testUpload(path, body) 

Create http multiparty post(upload) test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |
| body | `Object`  | valid multiparty body | &nbsp; |
| body.attach | `Object`  | valid attachments | &nbsp; |




##### Examples

```javascript

const { testUpload } = require('@lykmapipo/express-test-helpers');

const body =
 ({ caption: 'Avatar', attach: { avatar: { file: './avatar.png' } } });
testUpload('/v1/files', body)
 .expect(201)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest multiparty post request



#### testDownload(path, optns) 

Create http multiparty get(download) test request




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path under test | &nbsp; |
| optns | `Object`  | valid options for test | &nbsp; |
| optns.encoding&#x3D;binary | `Function`  | valid file encoding used for parsing response body | *Optional* |




##### Examples

```javascript

const { testDownload } = require('@lykmapipo/express-test-helpers');

testDownload('/v1/files')
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Function`  valid supertest get request



#### testRouter(optns, router) 

Create test requests for express router




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object` `String`  | valid express router mount path or options | &nbsp; |
| router | `Router`  | valid express router | &nbsp; |




##### Examples

```javascript

const { testRouter } = require('@lykmapipo/express-test-helpers');

const { testGet } = testRouter('users', router);

testGet()
 .expect(200)
 .end((err, res) => {
   if (err) throw err;
 });
```


##### Returns


- `Object`  valid supertest requests




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
