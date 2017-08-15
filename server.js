const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//we specify the port to be used, in the line below:
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Jet Fuel'

//bodyParser gives an ability to parse the body of an HTTP request
app.use(bodyParser.json())

//storing folders:
app.locals.folders = {
  wowow: 'folder'
}


app.get('/', (request, response) => {
  response.send('Server working!')
})

//creating a GET route for the list of folders:
app.get('/api.folders', (request, response) => {
  const folders = app.locals.folders

  //this is a shorthand for setting the response type as application/json; server stringifies the response for us
  response.json({ folders })
})

//specifying a get request for a specific folder:
app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  const message = app.locals.folders[id];

  if(!message) { response.status(404).send('Folder not found')}

  response.json({ id, message })
})

//creating a defined POST route
app.post('/api/folders', (request, response) => {
  //generating a random ID:
  const id = Date.now()
  const { message } = request.body

  //error handling: if there is no message included in the body, the server will respond with 422 error code (unprocessable entity), and send a notice to include message
  if (!message) { return response.status(422), send('Must include message in the body')}

  app.locals.folders[id] = message;

  //the response will come with 201 (fulfilled request) code and will post a new folder in json format
  response.status(201).json({ id, message })
})


//the code below tells the server to listen for connections on a given port
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
