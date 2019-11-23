const server = require('../server/server.js');
const request = require('supertest');

describe('auth\'s', function(){
  describe('POST /login', function() {
    it('should return status(401) without property token.', function() {
      const user = {
        username: '',
        password: 'password',
        }
      
      return request(server)
        .post('/auth/login')
        .send(user)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it('should return status(401) message without property token.', function() {
      const user = {
        username: '',
        password: 'password',
        }
      
      return request(server)
      .post('/auth/login')
        .send(user)
        .then(res => {
          console.log('token', res.body.token);
          expect(res.body).toStrictEqual({ message: 'Invalid credentials.' });
        });
    });
  });
});