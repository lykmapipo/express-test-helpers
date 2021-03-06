import { createReadStream, readFileSync } from 'fs';
import multer from 'multer';
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
  testUpload,
  testDownload,
  testStream,
} from '../src/index';

describe('generic test helpers', () => {
  beforeEach(() => clear());

  it('should test option request', (done) => {
    expect(testOption).to.exist.and.be.a('function');
    testOption('/v1/users').expect(204, done);
  });

  it('should test head request', (done) => {
    expect(testHead).to.exist.and.be.a('function');
    testHead('/v1/users').expect(404, done);
  });

  it('should test get request', (done) => {
    expect(testGet).to.exist.and.be.a('function');
    testGet('/v1/users').expect(404, done);
  });

  it('should test get request', (done) => {
    app.get('/v1/users', (req, res) => res.ok());
    testGet('/v1/users').expect(200, done);
  });

  it('should test post request', (done) => {
    expect(testPost).to.exist.and.be.a('function');
    testPost('/v1/users', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test post request', (done) => {
    app.post('/v1/users', (req, res) => res.created());
    testPost('/v1/users', { name: faker.name.findName() }).expect(201, done);
  });

  it('should test patch request', (done) => {
    expect(testPatch).to.exist.and.be.a('function');
    testPatch('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test patch request', (done) => {
    app.patch('/v1/users/:id', (req, res) => res.ok());
    testPatch('/v1/users/1', { name: faker.name.findName() }).expect(200, done);
  });

  it('should test put request', (done) => {
    expect(testPut).to.exist.and.be.a('function');
    testPut('/v1/users/1', { name: faker.name.findName() }).expect(404, done);
  });

  it('should test put request', (done) => {
    app.put('/v1/users/:id', (req, res) => res.ok());
    testPut('/v1/users/1', { name: faker.name.findName() }).expect(200, done);
  });

  it('should test delete request', (done) => {
    expect(testDelete).to.exist.and.be.a('function');
    testDelete('/v1/users/1').expect(404, done);
  });

  it('should test post request', (done) => {
    app.delete('/v1/users/:id', (req, res) => res.ok());
    testDelete('/v1/users/1').expect(200, done);
  });

  it('should test upload request', (done) => {
    const file = `${__dirname}/fixtures/test.txt`;
    const handleUpload = [
      multer({ dest: 'logs/' }).single('avatar'),
      (req, res) => res.ok({ ...req.body, ...req.file }),
    ];
    app.post('/v1/uploads', handleUpload);
    testUpload('/v1/uploads', { caption: 'avatar', attach: { avatar: file } })
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.fieldname).to.be.eql('avatar');
        expect(body.originalname).to.be.eql('test.txt');
        expect(body.mimetype).to.be.eql('text/plain');
        expect(body.caption).to.be.eql('avatar');
        done(error, body);
      });
  });

  it('should test download request', (done) => {
    const file = `${__dirname}/fixtures/test.txt`;
    const fileContent = readFileSync(file).toString('base64');

    app.get('/v1/downloads', (req, res) => res.download(file));

    testDownload('/v1/downloads')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=UTF-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });

  it('should test stream download request', (done) => {
    const file = `${__dirname}/fixtures/test.txt`;
    const fileContent = readFileSync(file).toString('base64');

    app.get('/v1/streams', (req, res) => {
      res.attachment('test.txt');
      res.status(200);
      createReadStream(file).pipe(res);
    });

    testDownload('/v1/streams')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });

  it('should test stream request', (done) => {
    const file = `${__dirname}/fixtures/test.txt`;
    const fileContent = readFileSync(file).toString('base64');

    app.get('/v1/streams', (req, res) => {
      res.type('test.txt');
      res.status(200);
      createReadStream(file).pipe(res);
    });

    testStream('/v1/streams')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
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
