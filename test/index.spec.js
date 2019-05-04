import {
  expect,
  sinon,
  chai,
  faker,
  spy,
  testApp,
  testRequest,
  testGet,
} from '../src/index';

describe('express-test-helpers', () => {
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

  it('should expose generic test app', () => {
    expect(testApp).to.exist;
  });

  it('should expose generic test request', () => {
    expect(testRequest).to.exist;
  });

  it('should expose test get request', () => {
    expect(testGet).to.exist;
  });
});
