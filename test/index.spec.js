import {
  expect,
  sinon,
  chai,
  faker,
  spy,
  app,
  clear,
  testRequest,
  testOption,
  testHead,
  testGet,
  testPost,
  testPatch,
  testPut,
  testDelete,
} from '../src/index';

describe('express-test-helpers', () => {
  beforeEach(() => clear());

  it('should set test environment', () => {
    expect(process.env.NODE_ENV).to.exist.and.be.equal('test');
  });

  it('should expose chai', () => {
    expect(chai).to.exist;
    expect(chai.expect).to.exist.and.to.be.a('function');
    expect(chai.should).to.exist.and.to.be.a('function');
  });

  it('should expose sinon', () => {
    expect(sinon).to.exist;
    expect(sinon.spy).to.exist.and.to.be.a('function');
    expect(sinon.stub).to.exist.and.to.be.a('function');
    expect(sinon.mock).to.exist.and.to.be.a('function');
  });

  it('should expose faker', () => {
    expect(faker).to.exist;
    expect(faker.name).to.exist.and.to.be.an('object');
    expect(faker.address).to.exist.and.to.be.an('object');
    expect(faker.internet).to.exist.and.to.be.an('object');
    expect(faker.random).to.exist.and.to.be.an('object');
  });

  it('should spy', () => {
    const dialer = { dial: () => {} };
    const call = number => dialer.dial(number);
    const dialed = spy(dialer, 'dial');

    call();
    expect(dialed).to.have.been.calledOnce;

    dialed.restore();
  });

  it('should expose generic test request', done => {
    expect(testRequest).to.exist.and.be.a('function');
    testRequest()
      .get('/v1/users')
      .expect(404, done);
  });

  it('should expose test option request', done => {
    expect(testOption).to.exist.and.be.a('function');
    testOption('/v1/users').expect(204, done);
  });

  it('should expose test head request', done => {
    expect(testHead).to.exist.and.be.a('function');
    testHead('/v1/users').expect(404, done);
  });

  it('should expose test get request', done => {
    expect(testGet).to.exist.and.be.a('function');
    testGet('/v1/users').expect(404, done);
  });

  it('should expose test get request', done => {
    app.get('/v1/users', (req, res) => res.ok());
    testGet('/v1/users').expect(200, done);
  });

  it('should expose test post request', done => {
    expect(testPost).to.exist.and.be.a('function');
    testPost('/v1/users', { name: faker.name.findName() }).expect(404, done);
  });

  it('should expose test post request', done => {
    app.post('/v1/users', (req, res) => res.created());
    testPost('/v1/users', { name: faker.name.findName() }).expect(201, done);
  });

  it('should expose test patch request', done => {
    expect(testPatch).to.exist.and.be.a('function');
    testPatch('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should expose test put request', done => {
    expect(testPut).to.exist.and.be.a('function');
    testPut('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should expose test delete request', done => {
    expect(testDelete).to.exist.and.be.a('function');
    testDelete('/v1/users/1').expect(404, done);
  });
});
