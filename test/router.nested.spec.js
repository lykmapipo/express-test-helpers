import { Router } from '@lykmapipo/express-common';
import { clear, testRouter, faker } from '../src/index';

describe('routerFor - nested resources', () => {
  beforeEach(() => clear());

  const paths = {
    pathSingle: '/users/:user/comments/:id',
    pathList: '/users/:user/comments',
    pathSchema: '/users/:user/comments/schema',
  };

  const router = new Router({ version: '1.0.0' });
  router.get('/users/:user/comments', (req, res) => res.ok());
  router.get('/users/:user/comments/schema', (req, res) => res.ok());
  router.get('/users/:user/comments/:id', (req, res) => res.ok());
  router.post('/users/:user/comments', (req, res) => res.created());
  router.put('/users/:user/comments/:id', (req, res) => res.ok());
  router.patch('/users/:user/comments/:id', (req, res) => res.ok());
  router.delete('/users/:user/comments/:id', (req, res) => res.ok());

  it('should handle http GET /resource/:id/resource', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1 }).expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/schema', done => {
    const { testGetSchema } = testRouter(paths, router);
    testGetSchema({ user: 1 }).expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/:id', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1, id: 1 }).expect(200, done);
  });

  it('should handle http POST /resource/:id/resource', done => {
    const { testPost } = testRouter(paths, router);
    testPost({ user: 1, name: faker.name.findName() }).expect(201, done);
  });

  it('should handle http PATCH /resource/:id/resource/:id', done => {
    const { testPatch } = testRouter(paths, router);
    testPatch({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http PUT /resource/:id/resource/:id', done => {
    const { testPut } = testRouter(paths, router);
    testPut({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http DELETE /resource/:id/resource/:id', done => {
    const { testDelete } = testRouter(paths, router);
    testDelete({ user: 1, id: 1 }).expect(200, done);
  });
});
