process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV;
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


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

  beforeEach((done) => {
      database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
        .then(() => {
          database.seed.run()
          .then(() => {
            done();
        });
      });
    });
  });

  describe('GET /api/v1/folders', () => {
    it('should return all of the folders', (done) => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((error, response) => {
        console.log(response.body)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.folders.length.should.equal(1);
        response.body.folders[0].should.have.property('name');
        response.body.folders[0].name.should.equal('travel');
        done();
      })
    })
  })

  describe('POST /api/v1/folders', () => {
    it('should create a new folder', (done) => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({
        name: 'recipes'
      })
      .end((error, response) => {
        // console.log('console', response.body.id)
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.id.should.have.property('name');
        response.body.id.name.should.equal('recipes');
        chai.request(server)
        .get('/api/v1/folders')
        .end((error, response) => {
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;
          response.body.folders.should.be.a('array');
          response.body.folders.length.should.equal(2);
          response.body.folders[1].should.have.property('name');
          response.body.folders[1].name.should.equal('recipes');
          done();
        })
      })
    })

    it('should not create a record with missing data', (done) => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({
        folder: 'projects'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('Missing required parameter name');
        done();
      })
    })


  })

})
