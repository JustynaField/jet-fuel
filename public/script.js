var folderName = $('#folder-name')

// $('button').click(function() {
//   alert("jQuery connected")
// })

$('#create-folder').on('click', function() {
  createNewFolder();
})

function createNewFolder() {
  $('.folders-list').prepend(
    '<div class="card">' +
      '<h3>' + folderName.val() + '</h3>'
      + '<img src="icons/garbage.svg" class="garbage" />' +
    '</div>'
  )
}
