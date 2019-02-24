class Photo {
  constructor(id, title, caption, file) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = false;
  }

  saveToStorage() {
    var stringifiedPhotos = JSON.stringify(photos);
    localStorage.setItem("photos", stringifiedPhotos);
  }

  deleteFromStorage() {
    
  }
  updateContent() {
  
  }
  updatePhoto() {
  
  }
}