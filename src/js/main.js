import inputSearch from "../tempaltes/search.hbs";
import cards from "../tempaltes/cards.hbs";
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from "basiclightbox";

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
  }

  fetchImages() {
    let URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.perPage}&key=${this.apiKey}`;
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.publicCarts(data.hits);
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

  publicCarts = (arrData) => {
    this.removeData();
    let markup = cards(arrData);
    this.list.insertAdjacentHTML("beforeend", markup);
    if (arrData.length === 0) {
      alert(`pizda`);
    }
    console.log(arrData);
    let body = document.querySelector("body");
    let height = body.getBoundingClientRect().height;
    this.scrollPage(height);
    this.fullSizeImg();
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
      this.perPage = this.perPage + 12;
      this.fetchImages();
      return this.perPage;
    });
  }

  scrollPage(height) {
    window.scrollTo({
      top: height,
      behavior: "smooth",
    });
  }

  fullSizeImg() {
    let img = document.querySelectorAll("img");
    img.forEach((image) => {
      image.addEventListener("click", (elem) => {
        this.openMobal(elem.path[0].src);
      });
    });
  }

  openMobal(url) {
    basicLightbox.create(`<img src="${url}">`).show();
  }

  removeData() {
    this.list.innerHTML = "";
  }
}

new Gallery();
