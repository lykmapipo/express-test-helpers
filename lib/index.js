'use strict';

const testHelpers = require('@lykmapipo/test-helpers');
const uuidv1 = require('uuid/v1');
const lodash = require('lodash');
const expressCommon = require('@lykmapipo/express-common');
const supertest = require('supertest');

/**
 * @function clear
 * @name clear
 * @description Clear notFound, errorHandler and route handlers
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { clear } = require('@lykmapipo/express-test-helpers');
 *
 * beforeEach(() => clear());
 *
 */
const clear = () => {
  // eslint-disable-next-line no-underscore-dangle
  expressCommon.app._router.stack = lodash.filter(expressCommon.app._router.stack, stack => {
    const filtered =
      stack.name !== 'notFound' &&
      stack.name !== 'errorHandler' &&
      !stack.route &&
      !lodash.has(stack, 'handle.stack');
    return filtered;
  });
};

/**
 * @function testRequest
 * @name testRequest
 * @description Create generic test request with applied defaults
 * @return {Function} valid supertest request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testRequest } = require('@lykmapipo/express-test-helpers');
 *
 * const request = testRequest();
 * request.get('/users')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testRequest = () => {
  const request = supertest(expressCommon.testApp());
  return request;
};

/**
 * @function testOption
 * @name testOption
 * @description Create http option test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest option request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testOption } = require('@lykmapipo/express-test-helpers');
 *
 * testOption('/v1/users')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 * testOption('/v1/users/1')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testOption = path => {
  const request = testRequest().options(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  return request;
};

/**
 * @function testHead
 * @name testHead
 * @description Create http option test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest option request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testHead } = require('@lykmapipo/express-test-helpers');
 *
 * testHead('/v1/users')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 * testHead('/v1/users/1')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testHead = path => {
  const request = testRequest().head(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  return request;
};

/**
 * @function testGet
 * @name testGet
 * @description Create http get test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest get request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testGet } = require('@lykmapipo/express-test-helpers');
 *
 * testGet('/v1/users')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 * testGet('/v1/users/1')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testGet = path => {
  const request = testRequest().get(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  return request;
};

/**
 * @function testPost
 * @name testPost
 * @description Create http get test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest post request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testPost } = require('@lykmapipo/express-test-helpers');
 *
 * testPost('/v1/users', { name: 'John Doe', ... })
 *  .expect(201)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testPost = (path, body) => {
  const request = testRequest().post(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  request.send(body);
  return request;
};

/**
 * @function testPatch
 * @name testPatch
 * @description Create http patch test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest patch request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testPatch } = require('@lykmapipo/express-test-helpers');
 *
 * testPatch('/v1/users/1', { name: 'John Doe', ... })
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testPatch = (path, body) => {
  const request = testRequest().patch(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  request.send(body);
  return request;
};

/**
 * @function testPut
 * @name testPut
 * @description Create http put test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest put request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testPut } = require('@lykmapipo/express-test-helpers');
 *
 * testPut('/v1/users/1', { name: 'John Doe', ... })
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testPut = (path, body) => {
  const request = testRequest().put(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  request.send(body);
  return request;
};

/**
 * @function testDelete
 * @name testDelete
 * @description Create http delete test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest delete request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testDelete } = require('@lykmapipo/express-test-helpers');
 *
 * testDelete('/v1/users/1')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testDelete = path => {
  const request = testRequest().delete(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  return request;
};

/**
 * @function testMiddleware
 * @name testMiddleware
 * @description Create test requests for a middleware
 * @param {...Function} path valid express middleware
 * @return {Object} valid supertest requests
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testMiddleware } = require('@lykmapipo/express-test-helpers');
 *
 * const { testGet } = testMiddleware(ipFilter);
 *
 * testGet
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testMiddleware = (...middlewares) => {
  const path = `/${uuidv1()}`;
  const testReply = (req, res) => res.ok();
  expressCommon.app.all(path, ...[...middlewares, testReply]);
  return {
    testOption: () => testOption(path),
    testHead: () => testHead(path),
    testGet: () => testGet(path),
    testPost: (data = {}) => testPost(path, data),
    testPatch: (data = {}) => testPatch(path, data),
    testPut: (data = {}) => testPut(path, data),
    testDelete: () => testDelete(path),
    path,
  };
};

/**
 * @function testRouter
 * @name testRouter
 * @description Create test requests for express router
 * @param {String} resource valid express router mount path
 * @param {Router} router valid express router
 * @return {Object} valid supertest requests
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testRouter } = require('@lykmapipo/express-test-helpers');
 *
 * const { testGet } = testRouter('/v1/users', router);
 *
 * testGet
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
const testRouter = (resource, router) => {
  const path = `/v1/${resource}`;
  expressCommon.mount(router);
  return {
    testOption: () => testOption(path),
    testHead: () => testHead(path),
    testGet: id => (id ? testGet(`${path}/${id}`) : testGet(path)),
    testPost: (data = {}) => testPost(path, data),
    testPatch: (id, data = {}) => testPatch(`${path}/${id}`, data),
    testPut: (id, data = {}) => testPut(`${path}/${id}`, data),
    testDelete: id => testDelete(`${path}/${id}`),
    path,
  };
};

Object.defineProperty(exports, 'chai', {
  enumerable: true,
  get: function () {
    return testHelpers.chai;
  }
});
Object.defineProperty(exports, 'expect', {
  enumerable: true,
  get: function () {
    return testHelpers.expect;
  }
});
Object.defineProperty(exports, 'faker', {
  enumerable: true,
  get: function () {
    return testHelpers.faker;
  }
});
Object.defineProperty(exports, 'mock', {
  enumerable: true,
  get: function () {
    return testHelpers.mock;
  }
});
Object.defineProperty(exports, 'should', {
  enumerable: true,
  get: function () {
    return testHelpers.should;
  }
});
Object.defineProperty(exports, 'sinon', {
  enumerable: true,
  get: function () {
    return testHelpers.sinon;
  }
});
Object.defineProperty(exports, 'spy', {
  enumerable: true,
  get: function () {
    return testHelpers.spy;
  }
});
Object.defineProperty(exports, 'app', {
  enumerable: true,
  get: function () {
    return expressCommon.app;
  }
});
exports.clear = clear;
exports.testDelete = testDelete;
exports.testGet = testGet;
exports.testHead = testHead;
exports.testMiddleware = testMiddleware;
exports.testOption = testOption;
exports.testPatch = testPatch;
exports.testPost = testPost;
exports.testPut = testPut;
exports.testRequest = testRequest;
exports.testRouter = testRouter;