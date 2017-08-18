$(document).ready(function() {
  fetchFolders();
  fetchLinks();
})

//form for creating folders
$('#create-folder').on('click', function(e) {
  e.preventDefault();
  const foldername = $('#folder-name').val()
  printFolderToPage(foldername);
  postFolder();
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

//printing all folders to page:
const printAllFolders = (folders) => {

  folders.map(folder => {
    $('.folders-list').append(
      `<div value="${folder.id}" class="card">
        <h3 class="name">${folder.name}</h3>
        <div class="folder-details"></div>
      </div>`
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
      // printFolderToPage(data)
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
  .then( data => console.log('posting folder:', data))
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
console.log('e:', e)
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
  .then( data => {
    console.log('link being posted:',data)
    // postLinkToFolder(data)
    console.log('consoled:', $('.folders-list').children('.card').attr('value'))
    // $('.folders-list').children('.card').prop('value').append('<p>' + link + '</p>')
  })
  .catch(error => console.log('Error posting link: ', error))
}


// $('.folders-list').append(
//   `<div value="${folder.id}" class="card">



// const postLinkToFolder = (link) => {
//   $('.card value=').append('<p>' + link + '</p>')
// }


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
//   links.map(link => {
//
//   $('.folders-list').on('click', '.card', function() {
//     const folderId =
//
//   }
//     console.log('link in folder:', link.url)
//     console.log('folderid in folder:', link.url)
//     if()

    //if folder id === folder id from link object
    //[....].append('<p>' + link.url + '</p>')
  // })
  // $('.folders-list').on('click', '.card', function() {


// }
// folders.map(folder =>



//
