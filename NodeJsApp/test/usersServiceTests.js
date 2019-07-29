const assert = require('chai').assert;
import User from '@models/user';
import { createUser } from '@services/users';


describe('User', function () {
  describe('#save()', function () {
    this.timeout(10000);
    it('should save without error', async function (done) {

      const user = new User({
        firstName: 'Mladn',
        lastName: 'Miloseic',
        username: 'mlao',
        email: 'mljo@demo.com'
      });

      try {
        console.log('before');

        const dbUser = await createUser(user);

        console.log('after');
        assert.isDefined(dbUser, 'dbUser is defined.');
        assert.equal(dbUser.firstName, 'Mladen', 'first name is same.');
        assert.equal(dbUser.lastName, 'Milosevic', 'last name is same.');
        done();
      } catch (e) {
        done(e);
      }
      done();

    });
  });
});