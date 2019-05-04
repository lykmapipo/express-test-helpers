import {
  chai,
  expect,
  faker,
  mock,
  should,
  sinon,
  spy,
} from '@lykmapipo/test-helpers';
import { testApp } from '@lykmapipo/express-common';
import supertest from 'supertest';

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
 * request.get('/user')
 *  .expect(200)
 *  .end(function(err, res) {
 *    if (err) throw err;
 *  });
 *
 */
export const testRequest = () => {
  const request = supertest(testApp());
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
 * testGet('/v1/user')
 *  .expect(200)
 *  .end(function(err, res) {
 *    if (err) throw err;
 *  });
 *
 * testGet('/v1/user/1')
 *  .expect(200)
 *  .end(function(err, res) {
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
 * testPost('/v1/user', {name: 'John Doe'})
 *  .expect(201)
 *  .end(function(err, res) {
 *    if (err) throw err;
 *  });
 *
 */
export const testPost = (path, body) => {
  const request = testRequest().post(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  request.send(body);
  return request;
};

/**
 * @function testPatch
 * @name testPatch
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
 * const { testPatch } = require('@lykmapipo/express-test-helpers');
 *
 * testPatch('/v1/user/1', {name: 'John Doe'})
 *  .expect(200)
 *  .end(function(err, res) {
 *    if (err) throw err;
 *  });
 *
 */
export const testPatch = (path, body) => {
  const request = testRequest().patch(path);
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  request.send(body);
  return request;
};

export { chai, expect, faker, mock, should, sinon, spy, testApp };
