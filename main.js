
// Variables
var chooseFile = document.querySelector("#choose-file");
var createPhoto = document.querySelector(".add-photo");
var photoContainer = document.querySelector(".output-content");
const card = document.querySelector(".photo-card");

var photos = JSON.parse(localStorage.getItem("photos")) || [];

var photoPlace = document.querySelector(".photo-place");
var reader = new FileReader();



// Event Listeners

createPhoto.addEventListener("click", addToAlbum);
// filterPhoto.addEventListener("click", filterPhotoFavorites);


function addToAlbum(parsedPhotos) {
  photos = [];
  parsedPhotos.forEach(function(photo) {
  var restoredPhoto = new Photo(photo.title, photo.file, photo.caption, Date.now());
  photos.push(restoredPhoto);
  appendPhoto(restoredPhoto);
  });
}

function addPhoto(){
  photos.forEach(function(photo) {
    photoPlace.innerHTML += `<img src=${photo.file} />`
  })
}

function loadPhoto() {
  if(chooseFile.files[0]) {
    reader.readAsDataURL(chooseFile.files[0]);
    reader.onload = makePhoto;
  }
}

function appendPhoto(photo) {
 var displayPhoto = `<article class="photo-card">
      <h2 class="photo-title" contentEditable="true">${photo.title}</h2> 
      <figure class="photo-place">${photo.file}</figure> 
      <h2 class="photo-caption" contentEditable="true">${photo.caption}</h2>
      <section>
        <img src="images/foto-finder-delete.svg">
        <img src="images/foto-finder-favorite.svg">
      </section>
    </article>`;
  photoContainer += displayPhoto;
}

function makePhoto(e) {
  var newPhoto = new Photo(Date.now(), e.target.result);
  photoPlace.innerHTML += `<img src=${e.target.result} />`;
  photos.push(newPhoto)
  newPhoto.saveToStorage(photos);
  appendPhoto;
}

