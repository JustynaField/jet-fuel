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
        // console.log(response.body)
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

  describe('GET /api/v1/folders/:id', (request, response) => {

    it.skip('should return folder by id', (done) => {
      chai.request(server)
      .get('/api/v1/folders/1')
      .end((error, response) => {
        // console.log('console', response.body)
        response.should.have.status(200);
        done();
      })
    })

    it('should return an error if a specific folder does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/folders/100')
      .end((error, response) => {
        response.should.have.status(404);
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
          // console.log(response.body)
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

  describe('GET /api/v1/links', () => {

    it('should return all of the links', (done) => {
      chai.request(server)
      .get('/api/v1/links')
      .end((error, response) => {
        console.log('links: ', response.body)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('url');
        response.body[0].should.have.property('short_url');
        response.body[0].should.have.property('folder_id');
        response.body[0].should.have.property('created_at');
        response.body[0].folder_id.should.equal(1)
        done();
      })
    })
  })
  //
  // describe('POST /api/v1/links', () => {
  //
  //   it.skip('should post a new link', () => {
  //     chai.request(server)
  //     .post('/api/v1/links')
  //     .send({
  //
  //     }).end((error, response) => {
  //       console.log('POST LINK ', response.body)
  //     })
  //   })
  // })



  // it('should create a new folder', (done) => {
  //   chai.request(server)
  //   .post('/api/v1/folders')
  //   .send({
  //     name: 'recipes'
  //   })
  //   .end((error, response) => {
  //     // console.log('console', response.body.id)
  //     response.should.have.status(201);


})
