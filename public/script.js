$(document).ready(function() {
  fetchFolders();
  fetchLinks();
  fetchFolderWithLinks();
})

//form for creating folders
$('#create-folder').on('click', function(e) {
  e.preventDefault();
  const foldername = $('#folder-name').val()
  // printFolderToPage(foldername);
  postFolder(foldername);
  fetchFolders();
  $('#folder-name').val('');
})

const printFolderToPage = (folder) => {
  $('.folders-list').append(
      '<div class="card">' +
        '<h3 class="name">' + folder + '</h3>' +
        '<div class="folder-details"></div>' +
      '</div>'
  )
}

const printFolder = (folder) => {
  $('.folders-list').append(
  `<div value="${folder.id}" class="card">
    <h3 class="name">${folder.name}</h3>
    <div class="folder-details"></div>
  </div>`)
}

//printing all folders to page:
const printAllFolders = (folders) => {
  $('.folders-list').empty();
  for(let i = 0; i<folders.length; i++){
    // console.log(folders[i])
    printFolder(folders[i]);
  }
}

const folderOptions = (folder) => {
  $('#select-folder').append(
    `<option value="${folder.id}"> ${folder.name} </option>`
  )
}

const dropDown = (folders) => {
  $('#select-folder').empty();
  for(let i = 0; i<folders.length; i++){
    folderOptions(folders[i]);
  }
}

const printLinksToFolder = (links) => {
  $('.links').append(`<p>${links}</p>`)
}

//fetch specific folder with details
const fetchFolderWithLinks = (id) => {
  fetch('/api/v1/folders')
  .then(res => res.json())
  .then(folders => {
    console.log(folders)
    fetch(`/api/v1/folders/${id}/links`)
    .then(res => res.json())
     .then(id => {
       printLinksToFolder(id)
     })
  })
  //
  // })
}

$('.folders-list').on('click', '.card', function(e) {
  // console.log(e.currentTarget.attributes.value.nodeValue)

  const id = e.currentTarget.attributes.value.nodeValue;
  console.log(id)
  fetchFolderWithLinks(id);

})

//fetch folders from database
const fetchFolders = () => {
  fetch('/api/v1/folders')
    .then(res => res.json())
    .then(data => {
      printAllFolders(data.folders);
      dropDown(data.folders)
    })
    .catch(error => console.log('Error fetching folders: ', error))
}

//post a folder to database
const postFolder = (folderName) => {
  // const folder = $('#folder-name').val()

  fetch('/api/v1/folders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: folderName}),
  })
  .then(res => res.json())
  .then( data => {
    fetchFolders(data.folder)
  })
  .catch(error => console.log('Error posting folder: ', error))
}

//toggling folders in folders-list area
const folderDetails =
'<div>' +
  '<div class="saved-links">' +
    '<h4 class="link-list">Saved Links:</h4>' +
    '<div class="links"></div>'
  '</div>' +
'</div>'

//expanding folder with information
$('.folders-list').on('click', '.card', function() {
  const element = $(this)

  if(!element.hasClass('selected')){
    $(this).children('.folder-details').append(folderDetails)
    element.addClass('selected')
  } else {
    element.removeClass('selected')
    $(this).children('.folder-details').empty()
  }
})

//LINKS
$('#shorten-link').on('click', function(e) {
  e.preventDefault();
  const url = $('#url-input')
  const selectedFolder = $('#select-folder').val()

  postLink();
  url.val('')
})

const printLinkToPage = (link) => {
  console.log(link)
  $('.shortened').empty();
  $('.shortened').append(`<a class="shortened-url" href=${link.id.url} target='_blank'>${link.id.url}</a> <p><span>created: </span> ${link.id.created_at}</p>`)
}

//post link to database
const postLink = () => {
  const linkval = $('#url-input').val();
  const folderId = $('#select-folder').val()

  fetch('/api/v1/links', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({url: linkval, folder_id: folderId})
    })
  .then(res => res.json())
  .then( data => {
    console.log('data in POST:', data)
    printLinkToPage(data);

    console.log('link being posted:',data)

  })
  .catch(error => console.log('Error posting link: ', error))
}

//fetch links from database
const fetchLinks = () => {
  fetch('/api/v1/links')
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(error => console.log('Error fetching links: ', error))
}
