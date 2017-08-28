const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortHash = require('short-hash');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'

const requireHTTPS = (request, response, next) => {
  !request.secure ? response.redirect('https://' + request.hostname + request.url) : next ()
}

app.use(requireHTTPS);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.folders = {};
app.locals.links = {};

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json({folders});
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

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

app.get('/api/v1/links', (request, response) => {
  database('links').select()
    .then(links => {
      response.status(200).json(links);
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/links', (request, response) => {
  const newLink = {
    url: request.body.url,
    short_url: shortHash(request.body.url),
    folder_id: request.body.folder_id
  }

  for(let requiredParameter of ['url']) {
    if (!newLink[requiredParameter]) {
      return response.status(422).json({
        error: `Missing required parameter ${requiredParameter}`
      });
    }
  }

  database('links').insert(newLink, '*')
    .then(link => {
      response.status(201).json({ id: link[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/folders/:id/links', (request, response) => {
  database('links').where('folder_id', request.params.id).select()
    .then(links => {
      response.status(200).json(links);
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.get('/api/v1/links/:shortened', (request, response) => {
  database('links').where('short_url', request.params.shortened).select('url')
  .then(link => {
    response.redirect(`${link[0].url}`)
  })
  .catch(error => {
    response.status(500).json({ error });
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
