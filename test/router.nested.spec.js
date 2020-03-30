import { readFileSync, createReadStream } from 'fs';
import { Router } from '@lykmapipo/express-common';
import multer from 'multer';
import { clear, testRouter, faker, expect } from '../src/index';

describe('routerFor - nested resources', () => {
  beforeEach(() => clear());

  const file = `${__dirname}/fixtures/test.txt`;

  const handleUpload = [
    multer({ dest: 'logs/' }).single('avatar'),
    (req, res) => res.ok({ ...req.body, ...req.file }),
  ];

  const paths = {
    pathSingle: '/users/:user/comments/:id',
    pathList: '/users/:user/comments',
    pathSchema: '/users/:user/comments/schema',
    pathExport: '/users/:user/comments/export',
    pathUpload: '/users/:user/comments/upload',
    pathDownload: '/users/:user/comments/download',
    pathStream: '/users/:user/comments/stream',
  };

  const router = new Router({ version: '1.0.0' });
  router.get('/users/:user/comments', (req, res) => res.ok());
  router.get('/users/:user/comments/schema', (req, res) => res.ok());
  router.get('/users/:user/comments/export', (req, res) => res.download(file));
  router.get('/users/:user/comments/download', (req, res) =>
    res.download(file)
  );
  router.get('/users/:user/comments/stream', (req, res) => {
    res.type('test.txt');
    res.status(200);
    createReadStream(file).pipe(res);
  });
  router.get('/users/:user/comments/:id', (req, res) => res.ok());
  router.post('/users/:user/comments/upload', handleUpload);
  router.post('/users/:user/comments', (req, res) => res.created());
  router.put('/users/:user/comments/:id', (req, res) => res.ok());
  router.patch('/users/:user/comments/:id', (req, res) => res.ok());
  router.delete('/users/:user/comments/:id', (req, res) => res.ok());

  it('should handle http GET /resource/:id/resource', (done) => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1 }).expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/schema', (done) => {
    const { testGetSchema } = testRouter(paths, router);
    testGetSchema({ user: 1 }).expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/export', (done) => {
    const { testGetExport } = testRouter(paths, router);
    testGetExport({ user: 1 })
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/export', (done) => {
    const { testExport } = testRouter(paths, router);
    testExport({ user: 1 })
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should work on get download', (done) => {
    const { testDownload } = testRouter(paths, router);
    testDownload({ user: 1 })
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should work on get stream', (done) => {
    const fileContent = readFileSync(file).toString('base64');
    const { testStream } = testRouter(paths, router);
    testStream({ user: 1 })
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, (error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });

  it('should handle http GET /resource/:id/resource/:id', (done) => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1, id: 1 }).expect(200, done);
  });

  it('should work on upload', (done) => {
    const { testUpload } = testRouter(paths, router);
    const options = {
      user: 1,
      name: faker.name.findName(),
      caption: 'avatar',
      attach: { avatar: file },
    };
    testUpload(options).expect(200, (error, { body }) => {
      expect(error).to.not.exist;
      expect(body.fieldname).to.be.eql('avatar');
      expect(body.originalname).to.be.eql('test.txt');
      expect(body.mimetype).to.be.eql('text/plain');
      expect(body.caption).to.be.eql('avatar');
      done(error, body);
    });
  });

  it('should handle http POST /resource/:id/resource', (done) => {
    const { testPost } = testRouter(paths, router);
    testPost({ user: 1, name: faker.name.findName() }).expect(201, done);
  });

  it('should handle http PATCH /resource/:id/resource/:id', (done) => {
    const { testPatch } = testRouter(paths, router);
    testPatch({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http PUT /resource/:id/resource/:id', (done) => {
    const { testPut } = testRouter(paths, router);
    testPut({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http DELETE /resource/:id/resource/:id', (done) => {
    const { testDelete } = testRouter(paths, router);
    testDelete({ user: 1, id: 1 }).expect(200, done);
  });
});
