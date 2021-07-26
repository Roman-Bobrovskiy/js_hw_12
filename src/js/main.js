import inputSearch from "../tempaltes/search.hbs";
import cards from "../tempaltes/cards.hbs";
class Gallery {
  constructor() {
    this.search = "";
    this.page = 1;
    this.perPage = 12;
    this.apiKey = "22602926-3614d0f9783b43324aa2f82a8";
    this.list = document.querySelector("#gallery");
    this.divInputSearch = document.querySelector("#inputSearch");
    this.btnLoadMore = document.querySelector(".btnLoadMore");
    this.fetchImages();
    this.publicFormInput();
    this.getInputData();
    this.loadMoreBtn();
    console.log(this);
  }

  fetchImages() {
    let URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.publuc(data.hits);
      })
      .catch((err) => console.log(err));
  }

  publicFormInput() {
    this.divInputSearch.innerHTML = inputSearch();
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", (event) => {
      this.search = document.querySelector("#search-form")[0].value;
      event.preventDefault();
      this.getInputData();
    });
  }

  publuc = (arrData) => {
    this.removeData();
    arrData.map((obj) => {
      this.list.insertAdjacentHTML(
        "beforeend",
        `<li class="photo-card">
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
           </li>`
      );
    });
  };

  getInputData() {
    let value = document.querySelector(`input[name="query"]`);
    value.addEventListener("input", (event) => {
      let newValue = event.target.value;
      return newValue;
    });

    if (this.search !== this.newValue) {
      this.perPage = 12;
    }
    this.fetchImages();
  }

  loadMoreBtn() {
    this.btnLoadMore.addEventListener("click", () => {
      let inputValue = document.querySelector("#search-form")[0].value;
      this.search = inputValue;
      this.perPage = this.perPage += this.perPage;
      this.fetchImages();
      return this.perPage;
    });
  }

  removeData() {
    this.list.innerHTML = "";
  }
}
let $ = require("jquery");
let _ = require("lodash");
new Gallery();
