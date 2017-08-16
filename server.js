const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
const fs = require('fs');

//we specify the port to be used, in the line below:
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Jet Fuel'

//connecting static files (in the public folder) to the server
app.use(express.static('public'))

//bodyParser gives an ability to parse the body of an HTTP request
app.use(bodyParser.json())
//for url encoded bodies:
app.use(bodyParser.urlencoded({ extended: true }));

//storing folders:
app.locals.folders = {};

//storing links:
app.locals.links = {};

//creating a GET request for the HOME PAGE (index.html):
app.get('/', (request, response) => {
  //__dirname is a global variable that provides the directory name of the current module (the path)
  response.sendFile(__dirname + '/index.html')
})


//creating a GET request for the LIST OF FOLDERS:
app.get('/api/folders', (request, response) => {
  const folders = app.locals.folders

  //this is a shorthand for setting the response type as application/json
  //server stringifies the response for us
  response.json({ folders })
})


//specifying a GET request for a SPECIFIC FOLDER:
app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  const message = app.locals.folders[id];

  if(!message) { response.status(404).send('Folder not found')}

  response.json({ id, message })
})

//************************************************************
//GET request for all LINKS:
app.get('/api/links', (request, response) => {
  const links = app.locals.links

  if(!links) { response.status(404).send('Links not found')}

  response.json({ links })
})

//GET: requesting all LINKS OF A SPECIFIC FOLDER:
app.get('/api/folders/:id/links', (request, response) => {

  //?????????????????????
})

//GET: shortened URLs
app.get('/api/urls', (request, response) => {
  const shorturls = app.locals.urls
  response.json({ shorturls })
})

//POSTing LINKS
app.post('/api/links', (request, response) => {
  const id = Date.now()
  const { link } = request.body

  app.locals.links[id] = link;
  response.status(201).json({ id, link })
})

//*************************************************************


//creating a defined POST route for POSTING A FOLDER:
app.post('/api/folders', (request, response) => {
  //generating a random ID:
  const id = Date.now()
  const { folder } = request.body

  //error handling: if there is no folder included in the body, the server will respond with 422 error code (unprocessable entity), and send a notice to include folder
  if (!folder) { return response.status(422), send('Must include folder in the body')}

  app.locals.folders[id] = folder;

  //the response will come with 201 (fulfilled request) code and will post a new folder in json format
  response.status(201).json({ id, folder })
})


//the code below tells the server to listen for connections on a given port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
