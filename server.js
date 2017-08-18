const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//DATABASE CONFIGURATION:
//specifying that we are working in development environment
//process.env.NODE_ENV allows us to work in different environments
//process is an object, gives us information about...
// it knows it's in a production environment because of the fallback
//we want it to be detected automatically so that it can vary based on where our application is running:
const environment = process.env.NODE_ENV || 'development';
//connecting to knexfile and its development object
const configuration = require('./knexfile')[environment];
//requiring knex, passing configuration into knex
const database = require('knex')(configuration);

// const fs = require('fs');

//we specify the port to be used, in the line below:
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'

//connecting static files (in the public folder) to the server
app.use(express.static('public'))

//bodyParser gives an ability to parse the body of an HTTP request
app.use(bodyParser.json());
//for url encoded bodies:
app.use(bodyParser.urlencoded({ extended: true }));


//storing folders:
app.locals.folders = {};
//storing links:
app.locals.links = {};

process.env.FOO = 'bar';

//ENDPOINTS:
//GET request for the HOME PAGE (index.html):
app.get('/', (request, response) => {
  //__dirname is a global variable that provides the directory name of the current module (the path)
  response.sendFile(__dirname + '/index.html')
})

//GET request for the LIST OF FOLDERS:
app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json(folders);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

//defining POST route for posting ONE FOLDER:
app.post('/api/v1/folders', (request, response) => {
  const newFolder = request.body;

  for(let requiredParameter of ['name']) {
    if (!newFolder[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    }
  }

  database('folders').insert(newFolder, ['id', 'name'])
    .then(folder => {
      response.status(201).json({ id: folder[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

//GET request for a SPECIFIC FOLDER:
app.get('/api/v1/folders/:id', (request, response) => {
  database('folders').where('id', request.params.id).select()
    .then(folders => {
      if (folders.length) {
        reponse.status(200).json(folders);
      } else {
        response.status(404).json({
          error: `Could not find folder with id of ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

//GET request for all LINKS:
app.get('/api/v1/links', (request, response) => {
  database('links').select()
    .then(links => {
      response.status(200).json(links);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

//POST a LINK
app.post('/api/v1/links', (request, response) => {
  const newLink = request.body;
  console.log('newLink:', newLink)

  for(let requiredParameter of ['url']) {
    if (!newLink[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    }
  }

  database('links').insert(newLink, ['id', 'url', 'folder_id'])
    .then(link => {

      response.status(201).json({ id: link[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})



//GET: requesting all LINKS OF A SPECIFIC FOLDER:
app.get('/api/v1/folders/:id/links', (request, response) => {
  database('links').where('folder_id', request.params.id).select()
    .then(links => {
      response.status(200).json(links);
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})


//the code below tells the server to listen for connections on a given port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
