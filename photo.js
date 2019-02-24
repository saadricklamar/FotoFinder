class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file= file;
    this.favorite = favorite || true;
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