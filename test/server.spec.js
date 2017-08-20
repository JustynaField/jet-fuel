const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');


chai.use(chaiHTTP);

describe('Client Routes', () => {
  it('Should return homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/empty')
    .end((error, response) => {
      response.should.have.status(404);
      done();
    })
  })
})

describe('API Routes', () => {
  describe('GET /api/v1/folders', () => {
    it('should return all of the folders', (done) => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        // response.body[0].should.have.property('name')
        done();
      })
    })
  })
})









//
