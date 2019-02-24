
// Variables
var chooseFile = document.querySelector("#choose-file");
var createPhoto = document.querySelector(".add-photo");
const card = document.querySelector(".photo-card");

var photos = JSON.parse(localStorage.getItem("photos")) || [];

var photoPlace = document.querySelector(".photo-place");
var reader = new FileReader();


addToAlbum(photos);
// Event Listeners

createPhoto.addEventListener("click", loadPhoto);
// filterPhoto.addEventListener("click", filterPhotoFavorites);


function addToAlbum(parsedPhotos) {
  photos = [];
  parsedPhotos.forEach(function(photo) {
    var restoredPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file);
    photos.push(restoredPhoto);
    appendPhoto(restoredPhoto);
  });
}

function loadPhoto(e) {
  e.preventDefault();
  if(chooseFile.files[0]) {
    reader.readAsDataURL(chooseFile.files[0]);
    reader.onload = makePhoto;
  }
}

function makePhoto(e) {
  var title = document.querySelector("#title-input");
  var caption = document.querySelector("#caption-input");
  var newPhoto = new Photo(Date.now(), title.value, caption.value, e.target.result);
  photos.push(newPhoto)
  newPhoto.saveToStorage(photos);
  appendPhoto(newPhoto);
}

function appendPhoto(photo) {
 var photoContainer = document.querySelector(".output-photo");
 var displayPhoto = `<article class="photo-card" data-index=${photo.id}>
      <h2 class="photo-title" contentEditable="true">${photo.title}</h2> 
      <figure class="photo-place">
        <img src="${photo.file}" width="100%">
        <figcaption class="photo-caption" contentEditable="true">
          ${photo.caption}
        </figcaption>
      </figure> 
      <section>
        <img src="images/delete.svg" class="delete-svg">
        <img src="images/favorite.svg" class="favorite-svg">
      </section>
    </article>`;
  photoContainer.insertAdjacentHTML("afterbegin", displayPhoto);
}



