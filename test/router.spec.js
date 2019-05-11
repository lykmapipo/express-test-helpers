import { Router } from '@lykmapipo/express-common';
import { clear, testRouter, faker } from '../src/index';

describe('router test helpers - simple resource', () => {
  beforeEach(() => clear());

  const router = new Router({ version: '1.0.0' });
  router.get('/users', (req, res) => res.ok());
  router.get('/users/schema', (req, res) => res.ok());
  router.get('/users/:id', (req, res) => res.ok());
  router.post('/users', (req, res) => res.created());
  router.put('/users/:id', (req, res) => res.ok());
  router.patch('/users/:id', (req, res) => res.ok());
  router.delete('/users/:id', (req, res) => res.ok());

  it('should work on get', done => {
    const { testGet } = testRouter('users', router);
    testGet().expect(200, done);
  });

  it('should work on get schema', done => {
    const { testGetSchema } = testRouter('users', router);
    testGetSchema().expect(200, done);
  });

  it('should work on get single', done => {
    const { testGet } = testRouter('users', router);
    testGet(1).expect(200, done);
  });

  it('should work on post', done => {
    const { testPost } = testRouter('users', router);
    testPost({ name: faker.name.findName() }).expect(201, done);
  });

  it('should work on put', done => {
    const { testPut } = testRouter('users', router);
    testPut(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should work on patch', done => {
    const { testPatch } = testRouter('users', router);
    testPatch(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should work on delete', done => {
    const { testDelete } = testRouter('users', router);
    testDelete(1).expect(200, done);
  });
});
