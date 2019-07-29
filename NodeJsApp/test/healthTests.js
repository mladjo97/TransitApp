import app from '../src/app';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('# App Health Check', () => {
    it('should return 200 OK', () => {
        chai.request(app)
            .get('/status')
            .end((err, res) => {
                res.should.have.status(200);
            });
    });
});