// Test:
// alert(1);

//Listen for form submission
document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(ed){

  //Get form values
  var siteName = document.getElementById('siteName').value;
  // test: console.log(siteName);
  var siteURL = document.getElementById('siteURL').value;

  if(!validateForm(siteName, siteURL)) {
    return false;
  }

  // Save form values to bookmark variable
  var bookmark = {
    name: siteName,
    url: siteURL
  }
   // Test: console.log(bookmark);

   //Local storage test
   // localStorage.setItem('test', 'Hello World');
   // console.log(localStorage);
   // localStorage.getItem('test', 'Hello World');
   // localStorage.removeItem('test');
   // console.log(localStorage);

   // Store var bookmark in arr bookmarks in localStorage

   if(localStorage.getItem('bookmarks') === null){
     // make array if one doesn't exist already, in case of new bookmark
     var bookmarks = [];
     bookmarks.push(bookmark);
     //set to local localStorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }
   // If there are already bookmarks in localStorage; use JSON.parse to turn string back into JSON to store it into the bookmarks array. then it gets stringified to get stored in localstorage.
   else {
     // Get bookmarks from localStorage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     // Add bookmark to array
     bookmarks.push(bookmark);
     // Reset to local localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

   // clear form
   // What I put initially:
   // document.getElementById('siteName').value = '';
   // document.getElementById('siteURL').value = '';

   document.getElementById('bookmarkForm').reset();

  // Refreshes page
  fetchBookmarks();

  // Prevent from submit
  ed.preventDefault();
}

// Delete bookmarks function

function deleteBookmark(url){
  // Getting bookmark from localstorage via looping
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }

  // Resets localStorage after deletion
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Fetch bookmarks function

function fetchBookmarks() {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);

  var savedBookmarks = document.getElementById('savedBookmarks');

  // Build output
  // savedBookmarks.innerHTML = 'SDFGSDIFH';
  savedBookmarks.innerHTML = '';

  for(var i = 0; i <bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    savedBookmarks.innerHTML +=
    '<div class="card custom-card">' +
    '<h3>' +
    name +
    '<a class="btn btn-outline-primary visit-btn" target="_blank" href="'+url+'">Visit</a>' +
    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-outline-danger delete-btn" href="#">Delete</a>' +
    '</h3>' +
    '</div>';
  }

}

// Check form is valid
function validateForm(siteName, siteURL){
  // check inputs are valid
  if (!siteName || !siteURL){
    alert('Please fill in the form.')
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert('Please enter a valid URL.');
    return false;
  }
  return true;
}
