import { clear, testMiddleware } from '../src/index';

describe('middleware test helpers', () => {
  beforeEach(() => clear());

  const ipCheck = (req, res, next) => {
    res.set('X-IP-Checked', true);
    next();
  };

  it('should work on get', (done) => {
    const { testGet } = testMiddleware(ipCheck);
    testGet().expect('x-ip-checked', 'true').expect(200, done);
  });

  it('should work on post', (done) => {
    const { testPost } = testMiddleware(ipCheck);
    testPost().expect('x-ip-checked', 'true').expect(200, done);
  });

  it('should work on put', (done) => {
    const { testPut } = testMiddleware(ipCheck);
    testPut().expect('x-ip-checked', 'true').expect(200, done);
  });

  it('should work on patch', (done) => {
    const { testPatch } = testMiddleware(ipCheck);
    testPatch().expect('x-ip-checked', 'true').expect(200, done);
  });

  it('should work on delete', (done) => {
    const { testDelete } = testMiddleware(ipCheck);
    testDelete().expect('x-ip-checked', 'true').expect(200, done);
  });
});
