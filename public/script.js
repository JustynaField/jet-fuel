var folderName = $('#folder-name')

$('#create-folder').on('click', function(e) {
  e.preventDefault();
  createNewFolder();
  $('#folder-name').val('');
})

const createNewFolder = () => {
  $('.folders-list').append(
    '<div class="card">' +
      '<h3 class="name">' + folderName.val() + '</h3>' +
      // '<button class="delete">x</button>' +
    '</div>'
  )
  // deleteFolder()
}

// const deleteFolder = () => {
//   $('.folder-details').on('click', '.delete', function() {
//
//     $('.folder-details').remove();
//     // $(this).closest().remove('.card');
//   })
// }

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
