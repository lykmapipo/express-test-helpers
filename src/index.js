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
  request.set('Accept', 'application/json');
  request.set('Content-Type', 'application/json');
  return request;
};

/**
 * @function testGet
 * @name testGet
 * @description Create http get test request
 * @param {String} path valid path under test
 * @return {Function} valid supertest request
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
 * testGet('/user')
 *  .expect(200)
 *  .end(function(err, res) {
 *    if (err) throw err;
 *  });
 *
 */
export const testGet = path => {
  const request = testRequest();
  request.get(path);
  return request;
};

export { chai, expect, faker, mock, should, sinon, spy, testApp };
