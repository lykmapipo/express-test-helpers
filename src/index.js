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
 * @description Create test request
 * @return {Function} valid supertest request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
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

export { chai, expect, faker, mock, should, sinon, spy, testApp };
