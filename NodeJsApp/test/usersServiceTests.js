describe('User', function() {
    describe('#save()', function() {
      it('should save without error', function(done) {

        const user = new User({
            firstName: 'Mladen',
            lastName: 'Milosevic',
            username: 'mladjo',
            email: 'mladjo@demo.com'
        });

        user.save(function(err) {
          if (err) done(err);
          else done();
        });
      });
    });
  });