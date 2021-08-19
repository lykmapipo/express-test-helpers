# express-test-helpers

[![Build Status](https://travis-ci.com/lykmapipo/express-test-helpers.svg?branch=master)](https://travis-ci.com/lykmapipo/express-test-helpers)
[![Dependencies Status](https://david-dm.org/lykmapipo/express-test-helpers.svg)](https://david-dm.org/lykmapipo/express-test-helpers)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/express-test-helpers/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/express-test-helpers?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/express-test-helpers)](https://github.com/lykmapipo/express-test-helpers/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@lykmapipo/express-test-helpers)](https://www.npmjs.com/package/@lykmapipo/express-test-helpers)

Sensible test helpers for express

## Installation

```sh
$ npm install --save @lykmapipo/express-test-helpers
```

## Usage
```js
import { 
  app, testGet, testPost, testPatch, 
  testPut, testDelete, testOption, testHead 
} from '@lykmapipo/express-test-helpers';

app.get('/v1/users', (req, res)=> { res.ok(); });
app.post('/v1/users', (req, res)=> { res.created(); });

testGet('/v1/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
    });

testPost('/v1/users', { name: 'John Doe' })
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        if (err) throw err;
    });
```

- With Mocha
```js
import { clear, testGet } from '@lykmapipo/express-test-helpers';

describe('GET /v1/users', () => {
    
    beforeEach(() => clear());

    it('responds with json', done => {
        testGet('/v1/users')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
$ npm install
```

- Then run test

```sh
$ npm test
```

## How to contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## LICENSE

MIT License

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
