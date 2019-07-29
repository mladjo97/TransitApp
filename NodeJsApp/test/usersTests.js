import User from '@models/user';
import app from '../src/app';
import { assert } from 'chai';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('# Users tests', () => {
  //Before each test we empty the database
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  /* 
  * ##### Test the GET route
  */
  describe('GET /users', () => {
    /* 
    * Get all users
    */
    it('should return an empty list of users', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          assert.equal(res.body.length, 0);
          done();
        });
    });

    /* 
    * Get all users when one added
    */
    it('should return an array with one user', (done) => {

      const user = {
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      };

      User.create(user);

      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          assert.equal(res.body.length, 1);
          done();
        });
    });

    /* 
      * Get single user when one added
      */
    it('should return a single user', (done) => {
      const user = new User({
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      });

      user.save((err, createdUser) => {
        chai.request(app)
          .get('/api/users/' + createdUser._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });

  });

  /*
  *  ##### Test the POST route
  */
  describe('POST /users', () => {
    /* 
    * Posting a single user
    */
    it('should POST a single user', (done) => {
      const user = {
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      };

      chai.request(app)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          done();
        });
    });

    /* 
    * Posting a single user without first name - should fail
    */
    it('should not POST a single user without firstName', (done) => {
      const user = {
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      };

      chai.request(app)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    /* 
    * Posting a single user with invalid email - should fail
    */
    it('should not POST a single user with invalid email', (done) => {
      const user = {
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo',
        username: 'mladjo'
      };

      chai.request(app)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });


  });

  /*
    * Test the /PUT/:id route
    */
  describe('PUT /users', () => {
    it('it should UPDATE a user given the id', (done) => {
      const user = new User({
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      });

      user.save((err, newUser) => {
        chai.request(app)
          .put('/api/users/' + newUser._id)
          .set('content-type', 'application/json')
          .send({
            _id: newUser._id,
            firstName: 'Update',
            lastName: 'Test',
            email: 'update@demo.com',
            username: 'mladjoni'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            assert.equal(res.body.firstName, 'Update', 'firstName is not updated.');
            assert.equal(res.body.lastName, 'Test', 'lastName is not updated.');
            assert.equal(res.body.username, 'mladjoni', 'username is not updated.');
            assert.equal(res.body.email, 'update@demo.com', 'email is not updated.');
            done();
          });
      });
    });
  });

  /*
    * Test the PUT route
    */
   describe('DELETE /users', () => {
    it('it should DELETE a user given the id', (done) => {
      const user = new User({
        firstName: 'Mladen',
        lastName: 'Milosevic',
        email: 'mladjo@demo.com',
        username: 'mladjo'
      });

      user.save((err, newUser) => {
        chai.request(app)
          .delete('/api/users/' + newUser._id)          
          .end((err, res) => {
            assert.equal(res.status, 200, 'status is not 200 OK');
            done();
          });
      });
    });

    it('it should not DELETE a user', (done) => {
      chai.request(app)
        .delete('/api/users/2ef15efa13dasd')          
        .end((err, res) => {
          assert.equal(res.status, 400, 'status is not 400 Bad Request');
          done();
        });
    });

  });

});


