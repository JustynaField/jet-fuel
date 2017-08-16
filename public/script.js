var folderName = $('#folder-name');

//form for creating folders
$('#create-folder').on('click', function(e) {
  e.preventDefault();
  createNewFolder();
  $('#folder-name').val('');
})

const createNewFolder = () => {
  printFolderToPage();
  postFolder();
}

const printFolderToPage = () => {
  $('.folders-list').append(
    '<div class="card">' +
      '<h3 class="name">' + folderName.val() + '</h3>' +
    '</div>'
  )
}

//fetch folders from database
const fetchFolders = () => {
  fetch('/api/v1/folders')
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => console.log('Error fetching folders: ', error))
}

// const folderParameter = () => {
//   const folder = $('#folder-name').val()
//
//   return ( {name: folder} )
// }

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



$('.folders-list').on('click', '.card', function() {

  // const folderId = $(this).closest('.name').attr('id')
  // const card = $(this);

  listFolderDetails();
  $(this).addClass('selected');
  $(this).siblings().removeClass('selected');
})


// const showOneFolder = (selected) {
//   $('.folders-list').each(function(index) {
//     if ($(this).attr)
//   })
// }

// const clearFolders = () => {
//   $('.folders-list').empty()
// }

const listFolderDetails = (folderId) => {
  $('.folder-details').empty();

  // const folderName = $(target).closest('.card').find('h3')
  $('.folder-details').append(
      '<div>' +
        // '<p>'+ folderName +'</p>' +
        '<p>'+ folderId +'</p>' +
        '<input type="text" placeholder="enter URL here"/>' +
        '<button>Submit</button>' +
        '<div class="saved-links">Saved Links:</div>' +
        // '<button class="delete">delete this folder</button>' +
      '</div>'
  );
}
