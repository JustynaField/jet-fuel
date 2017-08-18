const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');

chai.use(chaiHTTP)

describe('Client Routes', () => {
  it('Should return status 200', (done) => {
    chai.request(server)

    .get('/')
    .end((err, response) => {
      response.should.have.status(200)
      done()
    })
  })
})
