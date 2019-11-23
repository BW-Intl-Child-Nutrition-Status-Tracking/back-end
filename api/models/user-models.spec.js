const request = require('supertest');
const db = require('../../data/config/dbConfig.js');
const { add } = require('./user-models.js');

describe('user-model\'s', function() {
  describe('POST /add-user', function() {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return add a user.', async function() {
      await add({
        username: 'newuser1',
        password: 'password',
        first_name: 'userfirstname',
        last_name: 'usersurname',
        email: 'useremail@email.com'
      });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('Should add the provided user', async function() {
      await add({
        username: 'newuser1',
        password: 'password',
        first_name: 'user1firstname',
        last_name: 'user1surname',
        email: 'user1email@email.com'
      });
      await add({
        username: 'newuser2',
        password: 'password',
        first_name: 'user2firstname',
        last_name: 'user2surname',
        email: 'user2email@email.com'
      });

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('newuser1');
      expect(users[1].username).toBe('newuser2');
    });
  });
});