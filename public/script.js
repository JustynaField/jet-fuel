$(document).ready(function() {
  fetchFolders();
  fetchLinks();
})

//form for creating folders
$('#create-folder').on('click', function(e) {
  e.preventDefault();
  printFolderToPage();
  postFolder();
  $('#folder-name').val('');
})

const printFolderToPage = () => {
  $('.folders-list').append(
      '<div class="card">' +
        '<h3 class="name">' + folder.name + '</h3>' +
        '<div class="folder-details"></div>' +
      '</div>'
  )
}

//printing all folders to page:
const printAllFolders = (folders) => {

  folders.map(folder => {
    $('.folders-list').append(
      '<div class="card">' +
        '<h3 class="name">' + folder.name + '</h3>' +
        '<div class="folder-details"></div>' +
      '</div>'
    )
    $('#select-folder').append(
        `<option value="${folder.id}"> ${folder.name} </option>`
    )
  })
}

//fetch folders from database
const fetchFolders = () => {
  fetch('/api/v1/folders')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      printAllFolders(data);
      // printOptions(data)
    })
    .catch(error => console.log('Error fetching folders: ', error))
}

//post a folder to database
const postFolder = () => {
  const folder = $('#folder-name').val()

  fetch('/api/v1/folders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: folder}),
  })
  .then(res => res.json())
  .then( data => console.log(data))
  .catch(error => console.log('Error posting folder: ', error))
}

//toggling folders in folders-list area
const folderDetails =
'<div>' +
  '<div class="saved-links">' +
    '<h4>Saved Links:</h4>' +
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

  $('.shortened').append('<p>' + url.val() + '</p>')
  postLink();
  url.val('')
})

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
  .then( data => console.log('data in fetch:',data))
  .catch(error => console.log('Error posting link: ', error))
}

//fetch links from database
const fetchLinks = () => {
  fetch('/api/v1/links')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      // printLinksInFolder(data)
    })
    .catch(error => console.log('Error fetching links: ', error))
}

//printLinksToFolder
// const printLinksInFolder = (links) => {
//  $('.links').
// }




//
