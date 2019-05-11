import { filter, forEach, has, isPlainObject } from 'lodash';
import uuidv1 from 'uuid/v1';
import {
  chai,
  expect,
  faker,
  mock,
  should,
  sinon,
  spy,
} from '@lykmapipo/test-helpers';
import {
  all,
  del,
  get,
  patch,
  post,
  put,
  use,
  app,
  mount,
  testApp,
} from '@lykmapipo/express-common';
import supertest from 'supertest';
import { compile as compilePath } from 'path-to-regexp';

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
export const clear = () => {
  // eslint-disable-next-line no-underscore-dangle
  app._router.stack = filter(app._router.stack, stack => {
    const filtered =
      stack.name !== 'notFound' &&
      stack.name !== 'errorHandler' &&
      !stack.route &&
      !has(stack, 'handle.stack');
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
export const testRequest = () => {
  const request = supertest(testApp());
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
export const testOption = path => {
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
export const testHead = path => {
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
export const testGet = path => {
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
 * @param {Object} [body={}] valid response body under test
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
export const testPost = (path, body = {}) => {
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
 * @param {Object} [body={}] valid response body under test
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
export const testPatch = (path, body = {}) => {
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
 * @param {Object} [body={}] valid response body under test
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
export const testPut = (path, body = {}) => {
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
export const testDelete = path => {
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
export const testMiddleware = (...middlewares) => {
  const path = `/${uuidv1()}`;
  const testReply = (req, res) => res.ok();
  app.all(path, ...[...middlewares, testReply]);
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
 * @function testUpload
 * @name testUpload
 * @description Create http multiparty post(upload) test request
 * @param {String} path valid path under test
 * @param {Object} body valid multiparty body
 * @param {Object} body.attach valid attachments
 * @return {Function} valid supertest multiparty post request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testUpload } = require('@lykmapipo/express-test-helpers');
 *
 * const body =
 *  ({ caption: 'Avatar', attach: { avatar: { file: './avatar.png' } } });
 * testUpload('/v1/files', body)
 *  .expect(201)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
export const testUpload = (path, body = {}) => {
  const request = testRequest().post(path);
  const { attach, ...fields } = body;

  // add fields
  forEach(fields, (value, key) => request.field(key, value));

  // add attachments
  forEach(attach, (value, key) => {
    // handle field name and options
    if (isPlainObject(value)) {
      const { file, ...fileOptions } = value;
      request.attach(key, file, fileOptions);
    }
    // handle field name and file path
    else {
      request.attach(key, value);
    }
  });

  // return request
  return request;
};

/**
 * @function testDownload
 * @name testDownload
 * @description Create http multiparty get(download) test request
 * @param {String} path valid path under test
 * @param {Object} optns valid options for test
 * @param {Function} [optns.encoding=binary] valid file encoding used for
 * parsing response body
 * @return {Function} valid supertest get request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.6.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { testDownload } = require('@lykmapipo/express-test-helpers');
 *
 * testDownload('/v1/files')
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
export const testDownload = (path, optns = {}) => {
  // obtain options
  const { encoding = 'binary' } = optns;

  // prepare response body parser
  const parser = (response, cb) => {
    response.setEncoding(encoding);
    response.data = '';
    response.on('data', chunk => {
      response.data += chunk;
    });
    response.on('end', () => {
      cb(null, Buffer.from(response.data, encoding));
    });
  };

  // create request
  const request = testRequest()
    .get(path)
    .parse(parser);

  // return request
  return request;
};

/**
 * @function testRouter
 * @name testRouter
 * @description Create test requests for express router
 * @param {Object|String} optns valid express router mount path or options
 * @param {Router} router valid express router
 * @return {Object} valid supertest requests
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.3.0
 * @static
 * @public
 * @example
 *
 * const { testRouter } = require('@lykmapipo/express-test-helpers');
 *
 * const { testGet } = testRouter('users', router);
 *
 * testGet
 *  .expect(200)
 *  .end((err, res) => {
 *    if (err) throw err;
 *  });
 *
 */
export const testRouter = (optns, router) => {
  // normalize options
  const options = isPlainObject(optns) ? optns : { resource: optns };

  // create paths
  let { pathSingle = `/${options.resource}/:id` } = options;
  let { pathList = `/${options.resource}` } = options;
  let { pathSchema = `/${options.resource}/schema` } = options;
  let { pathExport = `/${options.resource}/export` } = options;

  // handle versioned router
  pathSingle = compilePath(
    router.version ? `/${router.version}${pathSingle}` : pathSingle
  );
  pathList = compilePath(
    router.version ? `/${router.version}${pathList}` : pathList
  );
  pathSchema = compilePath(
    router.version ? `/${router.version}${pathSchema}` : pathSchema
  );
  pathExport = compilePath(
    router.version ? `/${router.version}${pathExport}` : pathExport
  );

  // mout router for testing
  mount(router);

  // helpers
  const param = val => (isPlainObject(val) ? val : { id: val });
  const isSingle = val => {
    const params = param(val);
    const single = params && params.id;
    return single;
  };

  // pack test helpers
  return {
    testOption: (params = {}) => testOption(pathList(params)),
    testHead: (params = {}) => testHead(pathList(params)),
    testGet: (params = {}) =>
      isSingle(params)
        ? testGet(pathSingle(param(params)))
        : testGet(pathList(param(params))),
    testGetSchema: (params = {}) => testGet(pathSchema(param(params))),
    testGetExport: (params = {}) => testDownload(pathExport(param(params))),
    testPost: (data = {}) => testPost(pathList(param(data)), data),
    testPatch: (id, data = {}) => testPatch(pathSingle(param(id)), data),
    testPut: (id, data = {}) => testPut(pathSingle(param(id)), data),
    testDelete: id => testDelete(pathSingle(param(id))),
  };
};

export {
  chai,
  expect,
  faker,
  mock,
  should,
  sinon,
  spy,
  app,
  all,
  del,
  get,
  patch,
  post,
  put,
  use,
};
