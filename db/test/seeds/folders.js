let foldersData = [
  {'name': 'travel', links: [
    { url: "http://www.longlink1.com",
      id: 21,
      short_url: "11111111",
      folder_id: 11
    },
    { url: "http://www.longlink2.com",
      id: 22,
      short_url: "22222222",
      folder_id: 11
    },
    { url: "http://www.longlink3.com",
      id: 23,
      short_url: "33333333",
      folder_id: 11
    },
  ]
}
  // {name: 'images', links: [4, 5, 6]},
  // {name: 'job search', links: [7, 8, 9]}
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
          url: link,
          folder_id: folderId[0]
          // short_url: "11111111",
          // folder_id: folder[11] },
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
