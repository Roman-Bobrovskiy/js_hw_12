import inputSearch from "../tempaltes/search.hbs";
import cards from "../tempaltes/cards.hbs";
class Gallery {
  constructor() {
    this.search = "";
    this.pageNumber = 1;
    this.apiKey = "22602926-3614d0f9783b43324aa2f82a8";
    this.list = document.querySelector("#gallery");
    this.divInputSearch = document.querySelector("#inputSearch");
    this.fetchImages();
    console.log(this);
  }

  fetchImages() {
    let URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.pageNumber}&per_page=12&key=${this.apiKey}`;
    console.log(URL);
    console.log(this);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.publuc(data.hits);
      })
      .catch((err) => console.log(err));
  }

  publuc = (arrData) => {
    this.divInputSearch.innerHTML = inputSearch();
    this.search = document.querySelector("#search-form")[0];
    this.search.addEventListener(
      "input",
      _.debounce(this.getInputData.bind(this), 700)
    );
    this.removeData();
    arrData.map((obj) => {
      this.list.insertAdjacentHTML(
        "beforeend",
        `<ul class="gallery">
        <div class="photo-card">
         <img src="${obj.webformatURL}" alt="${obj.tags}" />
         <div class="stats">
           <p class="stats-item">
             <i class="material-icons">thumb_up</i>
             ${obj.likes}
           </p>
           <p class="stats-item">
             <i class="material-icons">visibility</i>
             ${obj.views}
           </p>
           <p class="stats-item">
             <i class="material-icons">comment</i>
             ${obj.comments}
           </p>
           <p class="stats-item">
             <i class="material-icons">cloud_download</i>
             ${obj.downloads}
           </p>
         </div>
       </div>
       </ul>`
      );
    });
  };

  getInputData() {
    this.search = document.querySelector("#search-form")[0].value;
    let result = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.pageNumber}&per_page=12&key=${this.apiKey}`;
    this.fetchImages(result);
    return result;
  }

  removeData() {
    this.list.innerHTML = "";
  }
}

let _ = require("lodash");
new Gallery();
