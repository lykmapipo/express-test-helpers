import { readFileSync, createReadStream } from 'fs';
import { Router } from '@lykmapipo/express-common';
import multer from 'multer';
import { clear, testRouter, faker, expect } from '../src/index';

describe('router test helpers - simple resource', () => {
  beforeEach(() => clear());

  const file = `${__dirname}/fixtures/test.txt`;

  const handleUpload = [
    multer({ dest: 'logs/' }).single('avatar'),
    (req, res) => res.ok({ ...req.body, ...req.file }),
  ];

  const router = new Router({ version: '1.0.0' });
  router.get('/users', (req, res) => res.ok());
  router.get('/users/schema', (req, res) => res.ok());
  router.get('/users/export', (req, res) => res.download(file));
  router.get('/users/download', (req, res) => res.download(file));
  router.get('/users/stream', (req, res) => {
    res.type('test.txt');
    res.status(200);
    createReadStream(file).pipe(res);
  });
  router.get('/users/:id', (req, res) => res.ok());
  router.post('/users/upload', handleUpload);
  router.post('/users', (req, res) => res.created());
  router.put('/users/:id', (req, res) => res.ok());
  router.patch('/users/:id', (req, res) => res.ok());
  router.delete('/users/:id', (req, res) => res.ok());

  it('should work on get', (done) => {
    const { testGet } = testRouter('users', router);
    testGet().expect(200, done);
  });

  it('should work on get schema', (done) => {
    const { testGetSchema } = testRouter('users', router);
    testGetSchema().expect(200, done);
  });

  it('should work on get export', (done) => {
    const { testGetExport } = testRouter('users', router);
    testGetExport()
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should work on get export', (done) => {
    const { testExport } = testRouter('users', router);
    testExport()
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should work on get download', (done) => {
    const { testDownload } = testRouter('users', router);
    testDownload()
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should work on get stream', (done) => {
    const fileContent = readFileSync(file).toString('base64');
    const { testStream } = testRouter('users', router);
    testStream()
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });

  it('should work on get single', (done) => {
    const { testGet } = testRouter('users', router);
    testGet(1).expect(200, done);
  });

  it('should work on upload', (done) => {
    const { testUpload } = testRouter('users', router);
    const options = { caption: 'avatar', attach: { avatar: file } };
    testUpload(options).expect(200, (error, { body }) => {
      expect(error).to.not.exist;
      expect(body.fieldname).to.be.eql('avatar');
      expect(body.originalname).to.be.eql('test.txt');
      expect(body.mimetype).to.be.eql('text/plain');
      expect(body.caption).to.be.eql('avatar');
      done(error, body);
    });
  });

  it('should work on post', (done) => {
    const { testPost } = testRouter('users', router);
    testPost({ name: faker.name.findName() }).expect(201, done);
  });

  it('should work on put', (done) => {
    const { testPut } = testRouter('users', router);
    testPut(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should work on patch', (done) => {
    const { testPatch } = testRouter('users', router);
    testPatch(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should work on delete', (done) => {
    const { testDelete } = testRouter('users', router);
    testDelete(1).expect(200, done);
  });
});
