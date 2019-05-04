import { mount, Router } from '@lykmapipo/express-common';
import {
  expect,
  faker,
  app,
  clear,
  testOption,
  testHead,
  testGet,
  testPost,
  testPatch,
  testPut,
  testDelete,
} from '../src/index';

describe('generic test helpers', () => {
  beforeEach(() => clear());

  it('should test option request', done => {
    expect(testOption).to.exist.and.be.a('function');
    testOption('/v1/users').expect(204, done);
  });

  it('should test head request', done => {
    expect(testHead).to.exist.and.be.a('function');
    testHead('/v1/users').expect(404, done);
  });

  it('should test get request', done => {
    expect(testGet).to.exist.and.be.a('function');
    testGet('/v1/users').expect(404, done);
  });

  it('should test get request', done => {
    app.get('/v1/users', (req, res) => res.ok());
    testGet('/v1/users').expect(200, done);
  });

  it('should test post request', done => {
    expect(testPost).to.exist.and.be.a('function');
    testPost('/v1/users', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test post request', done => {
    app.post('/v1/users', (req, res) => res.created());
    testPost('/v1/users', { name: faker.name.findName() }).expect(201, done);
  });

  it('should test patch request', done => {
    expect(testPatch).to.exist.and.be.a('function');
    testPatch('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test patch request', done => {
    app.patch('/v1/users/:id', (req, res) => res.ok());
    testPatch('/v1/users/1', { name: faker.name.findName() }).expect(200, done);
  });

  it('should test put request', done => {
    expect(testPut).to.exist.and.be.a('function');
    testPut('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test put request', done => {
    app.put('/v1/users/:id', (req, res) => res.ok());
    testPut('/v1/users/1', { name: faker.name.findName() }).expect(200, done);
  });

  it('should test delete request', done => {
    expect(testDelete).to.exist.and.be.a('function');
    testDelete('/v1/users/1').expect(404, done);
  });

  it('should test post request', done => {
    app.delete('/v1/users/:id', (req, res) => res.ok());
    testDelete('/v1/users/1').expect(200, done);
  });

  it('should clear attached routers', () => {
    const router = new Router({ version: '1.0.0' });
    mount(router);
    const beforeStack = app._router.stack;
    clear();
    const afterStack = app._router.stack;
    expect(beforeStack.length).to.not.be.equal(afterStack.length);
  });
});
