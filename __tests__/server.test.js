// __tests__/server.test.js
const http = require('http');

describe('HTTP Server', () => {
  let server;
  
  beforeAll(() => {
    const app = require('../index.js');
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('Server responds with 200 status code', (done) => {
    http.get('http://localhost:3000', (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('Server responds with Hello, World!', (done) => {
    http.get('http://localhost:3000', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(data).toBe('Hello, World!\n');
        done();
      });
    });
  });
});