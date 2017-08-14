var folderName = $('#folder-name')

// $('button').click(function() {
//   alert("jQuery connected")
// })

$('#create-folder').on('click', function() {
  createNewFolder();
})

function createNewFolder() {
  $('.folders-area').prepend(
    '<div><h3>' + folderName.val() + '</h3></div>'
  )
}
