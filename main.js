
// Variables
var chooseFile = document.querySelector("#choose-file");
var createPhoto = document.querySelector(".add-photo");
const card = document.querySelector(".photo-card");
var photoContainer = document.querySelector(".output-photo");
var photos = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();


addToAlbum(photos);


createPhoto.addEventListener("click", loadPhoto);
photoContainer.addEventListener("click", handleCardClickEvents);
photoContainer.addEventListener("keyup", editCard);

function addToAlbum(parsedPhotos) {
  photos = [];
  parsedPhotos.forEach(function(photo) {
    var restoredPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
    photos.push(restoredPhoto);
    appendPhoto(restoredPhoto);
  });
}

function handleCardClickEvents(e){
  if(e.target.id === "delete") {
    deletePhoto(e);
  } 
  if (e.target.classList.contains("favorite-svg")) {
    favoritePhoto(e);
  }
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
  var newPhoto = new Photo(Date.now(), title.value, caption.value, e.target.result, false);
  photos.push(newPhoto)
  newPhoto.saveToStorage(photos);
  appendPhoto(newPhoto);
}

function appendPhoto(photo) {
 var displayPhoto = `<article class="photo-card" data-index=${photo.id}>
      <h2 class="photo-title" contentEditable="true">${photo.title}</h2> 
      <figure class="photo-place">
        <img src="${photo.file}" width="100%" class="image" id="imagery">
        <figcaption class="photo-caption" contentEditable="true">
          ${photo.caption}
        </figcaption>
      </figure> 
      <section class="card-buttons">
        <button><img src="images/delete.svg" class="delete-svg" id="delete"></button>
        <button class="favorite-button favorite-svg"></button>
      </section>
    </article>`;
  photoContainer.insertAdjacentHTML("afterbegin", displayPhoto);
}

function editCard(e) {
  var newValue = e.target.textContent;
  var targetPhoto = findPhoto(e);
  console.log(targetPhoto);
  if(e.target.className === "photo-title") {
    targetPhoto.title = newValue;
  } if (e.target.className === "photo-caption") {
    targetPhoto.caption = newValue;
  }
  targetPhoto.updatePhoto();
  targetPhoto.saveToStorage(photos);
};

function findPhoto(e) {
 var photo = e.target.closest(".photo-card");
 var dataIndex = parseInt(photo.getAttribute("data-index"));
  return photos.find( (photo) =>  {
     return photo.id === dataIndex;
  });
};

// var image = document.querySelector(".image");
// image.addEventListener("click", changeImage);

// function changeImage(e) {
//   e.preventDefault();
//   if(e.target.className === "image") {
//     chooseFile.files[0] 
//     reader.readAsDataURL(chooseFile.files[0]);
//     reader.onload = loadPhoto;
//     }  
//   }



function deletePhoto(e) {
  e.target.closest(".photo-card").remove();
  var photoToRemove = findPhoto(e);
  photoToRemove.deleteFromStorage();
}


function favoritePhoto(e) {
  var photoToFavorite = findPhoto(e);
  if(photoToFavorite.favorite === false) {
    photoToFavorite.favorite = true;
    e.target.classList.add("favorite-active-svg");
  } else {
    photoToFavorite.favorite = false;
    e.target.classList.remove("favorite-active-svg");
  }
}



