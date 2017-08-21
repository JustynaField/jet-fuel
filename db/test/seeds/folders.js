let foldersData = [
  {'name': 'travel', links:[
    { id: 21,
    url: 'http://www.longlink1.com',
    short_url: '11111111',
    folder_id: 1,
    created_at: '2017-08-21T01:41:05.038Z',
    updated_at: '2017-08-21T01:41:05.038Z' },
  { id: 22,
    url: 'http://www.longlink2.com',
    short_url: '22222222',
    folder_id: 1,
    created_at: '2017-08-21T01:41:05.040Z',
    updated_at: '2017-08-21T01:41:05.040Z' },
  { id: 23,
    url: 'http://www.longlink3.com',
    short_url: '33333333',
    folder_id: 1,
    created_at: '2017-08-21T01:41:05.041Z',
    updated_at: '2017-08-21T01:41:05.041Z' }
    ]
  }
]

const createFolder = (knex, folder) => {
  console.log(folder.name)
  return knex('folders').insert({
    name: folder.name
  }, 'id')
  .then(folderId => {
    let linkPromises = [];

    folder.links.forEach(link => {
      linkPromises.push(
        createLink(knex, {
          url: link.url,
          folder_id: folderId[0],
          short_url: link.short_url,
          id: link.id
        })
      )
    });
    return Promise.all(linkPromises)
  })
};

const createLink = (knex, link) => {
  return knex('links').insert(link);
}

exports.seed = (knex, Promise) => {
  return knex('links').del()
    .then(() => knex('folders').del())
    .then(() => {
      let folderPromises = [];

      foldersData.forEach(folder => {
        folderPromises.push(createFolder(knex, folder));
      });

      return Promise.all(folderPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
