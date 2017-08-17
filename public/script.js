// const folderName = $('#folder-name');

$(document).ready(function() {
  fetchFolders();
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
  })
}

//fetch folders from database
const fetchFolders = () => {
  fetch('/api/v1/folders')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      printAllFolders(data)
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

$('.folders-list').on('click', '.card', function(e) {

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
