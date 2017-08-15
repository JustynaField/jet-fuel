var folderName = $('#folder-name')

$('#create-folder').on('click', function(e) {
  e.preventDefault();
  createNewFolder();
  $('#folder-name').val('');
})

const createNewFolder = () => {
  $('.folders-list').prepend(
    '<div class="card">' +
      '<h3 class="name">' + folderName.val() + '</h3>' +
    '</div>'
  )
}

$('.folders-list').on('click', '.card', function() {

  const folderId = $(this).closest('.name').attr('id')
  const target = $(this);

  listFolderDetails(target);
  $(this).addClass('selected')
})

// const showOneFolder = (selected) {
//   $('.folders-list').each(function(index) {
//     if ($(this).attr)
//   })
// }

// const clearFolders = () => {
//   $('.folders-list').empty()
// }

const listFolderDetails = (target, folderId) => {

  $('.folder-details').empty();
  $('.folders-list').siblings('.folders-list').removeClass('selected')

  const folderName = $(target).closest('.card').find('h3')

  $('.folder-details').append(
      '<div>' +
        '<p>'+ folderName +'</p>' +
        '<p>'+ folderId +'</p>' +
        '<input type="text" placeholder="enter URL here"/>' +
        '<button>Submit</button>' +
        '<div class="saved-links">Saved Links:</div>' +
      '</div>'
  );
  $(target).siblings('.folder-details').toggle();
  // $(target).siblings('.folders-list').toggle();
}
