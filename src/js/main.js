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
    this.loadMoreBtn();
    console.log(this);
  }

  fetchImages() {
    let URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
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
    this.search = document.querySelector("#search-form")[0].value;
    let result = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
    this.fetchImages(result);
    return result;
  }

  removeData() {
    this.list.innerHTML = "";
  }
  loadMoreBtn() {
    this.btnLoadMore.addEventListener("click", () => {
      this.perPage = this.perPage += this.perPage;
      console.log(this.search.value);
      this.getInputData(this.perPage);
      return this.perPage;
    });
  }
}

let _ = require("lodash");
new Gallery();
