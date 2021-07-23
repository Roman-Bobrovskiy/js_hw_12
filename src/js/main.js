import inputSearch from "../tempaltes/search.hbs";
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
      _.debounce(this.getInputData.bind(this), 500)
    );
    arrData.map((obj) => {
      this.list.insertAdjacentHTML(
        "beforeend",
        `<li class="smallImages"> <img src="${obj.previewURL}" alt="${obj.tags}"></li>`
      );
    });
  };

  getInputData() {
    this.search = document.querySelector("#search-form")[0].value;
    let result = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.pageNumber}&per_page=12&key=${this.apiKey}`;
    this.fetchImages(result);
    return result;
  }
}

let _ = require("lodash");
new Gallery();
