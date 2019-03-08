
var chooseFile = document.querySelector("#choose-file");
var createPhoto = document.querySelector(".add-photo");
var card = document.querySelector(".photo-card");
var searchBar = document.querySelector("#search-bar");
var filterFavorite = document.querySelector(".filter-photo");
var photoContainer = document.querySelector(".output-photo");
var photos = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var favoriteCounter = 0;

filterFavorite.addEventListener("click", toggleFavoriteButton);
searchBar.addEventListener("keyup", searchCards);
createPhoto.addEventListener("click", loadPhoto);
photoContainer.addEventListener("click", handleCardClickEvents);
photoContainer.addEventListener("focusout", editCard);

pageLoad(photos);

function pageLoad(parsedPhotos) {
  photos = [];
  parsedPhotos.forEach(function(photo) {
    var restoredPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
    photos.push(restoredPhoto);
    appendPhoto(restoredPhoto);
    reflectFavoriteCardsNumber();
  });
}

function handleCardClickEvents(e) {
  if(e.target.id === "delete") {
    deletePhoto(e);
  }
  if (e.target.classList.contains("favorite-svg")) {
    toggleFavoritePhoto(e);
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
  e.preventDefault();
  var title = document.querySelector("#title-input");
  var caption = document.querySelector("#caption-textarea");
  if(title.value === "" || caption.value === "") {
    alert("Please enter a title and caption for your photo.")
  } else {
    var newPhoto = new Photo(Date.now(), title.value, caption.value, e.target.result, false);
    photos.push(newPhoto)
    newPhoto.saveToStorage(photos);
    appendPhoto(newPhoto);
    title.value = "";
    caption.value = "";
  }
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
        <button><img src="images/delete.svg" class="delete-svg" id="delete" alt="gray trash icon used to delete photo card"></button>
        <button class="favorite-button favorite-svg" alt="gray heart icon that changes red when clicked and functions to favorite a photo"></button>
      </section>
    </article>`;
  photoContainer.insertAdjacentHTML("afterbegin", displayPhoto);
  persistFavoriteStatus(photo);
  emptyFooterMessage();
}

function editCard(e) {
  var newValue = e.target.textContent;
  var targetPhoto = findPhoto(e);
  if(e.target.className === "photo-title") {
    targetPhoto.title = newValue;
  } 
  if (e.target.className === "photo-caption") {
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

function deletePhoto(e) {
  e.target.closest(".photo-card").remove();
  var photoToRemove = findPhoto(e);
  photoToRemove.deleteFromStorage();
  if (photoContainer.childNodes.length <= 3){
    displayFooterMessage();
    favoriteCounter = 0;
    filterFavorite.value = "View Favorites";
  }
}

function toggleFavoritePhoto(e) {
  var photoToFavorite = findPhoto(e);
  if(photoToFavorite.favorite === false) {
    photoToFavorite.favorite = true;
    e.target.classList.add("favorite-active-svg");
    favoriteCounter++;
    filterFavorite.value = "View " + favoriteCounter + " Favorites";
  } else {
    photoToFavorite.favorite = false;
    e.target.classList.remove("favorite-active-svg");
    favoriteCounter--;
    filterFavorite.value = "View " + favoriteCounter + " Favorites";
  }
  photoToFavorite.saveToStorage();
}

function persistFavoriteStatus(photo) {
    if(photo.favorite === true) {
      var matchingCard = document.querySelector(`[data-index="${photo.id}"]`);
      var favIcon = matchingCard.querySelector(".favorite-svg");
      favIcon.classList.add("favorite-active-svg");
    }
}

function searchCards(e){
  var searchBarText = e.target.value;
  var regex = new RegExp(searchBarText, "i");
  var matchingPhotos = [];
  clearCards();
  for (let i = 0; i < photos.length; i++) {
    if(regex.test(photos[i].title) || regex.test(photos[i].caption)) {
      matchingPhotos.push(photos[i]);
      appendPhoto(photos[i]);
    }
  }
};

 var clearCards = () => {
   var photosToDelete = photoContainer.querySelectorAll('.photo-card');
  photosToDelete.forEach(function(photo) {
    photo.remove();
  });
 }

function reflectFavoriteCardsNumber() {
    var favoriteButton = document.querySelector(".favorite-button");
    if(favoriteButton.classList.contains("favorite-active-svg")) {
    favoriteCounter++;
    filterFavorite.value = "View " + favoriteCounter + " Favorites";
  }
}


function toggleFavoriteButton(e){
  e.preventDefault();
  if(filterFavorite.value !== "Show All Fotos") {
    displayFavorites();
  } else if (filterFavorite.value === "Show All Fotos") {
    displayAll();
  }
}

function displayFavorites() {
  var favoritedPhotos = [];
  clearCards();
  for (var i = 0; i < photos.length; i++) {
    if(photos[i].favorite === true) {
      favoritedPhotos.push(photos[i]);
      appendPhoto(photos[i]); 
    }
  } 
  filterFavorite.value = "Show All Fotos";
}

function displayAll() {
  var allPhotos = [];
  clearCards();
  for (var i = 0; i < photos.length; i++) {
        allPhotos.push(photos[i]);
        appendPhoto(photos[i]); 
  } 
  filterFavorite.value = "View " + favoriteCounter + " Favorites";
}

function emptyFooterMessage() {
  var displayMessage = document.querySelector(".add");
  displayMessage.classList.add("remove");
}

function displayFooterMessage() {
  var displayMessage = document.querySelector(".add");
  displayMessage.classList.remove("remove");
}


