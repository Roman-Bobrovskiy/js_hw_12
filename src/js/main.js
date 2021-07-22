import inputSearch from "../tempaltes/search.hbs";
class Gallery {
  constructor(data) {
    this.baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=`;
    this.search = "";
    this.pageNumber = 1;
    this.apiKey = "22602926-3614d0f9783b43324aa2f82a8";
    this.URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.pageNumber}&per_page=12&key=${this.apiKey}`;
    this.list = document.querySelector("#gallery");
    this.divInputSearch = document.querySelector("#inputSearch");
    this.data = data;
  }

  fetchImages() {
    fetch(this.URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.hits);
        // console.log(this.URL);
        this.publuc(data.hits);
      })
      .catch((err) => console.log(err));
  }
  publuc = (arrData) => {
    // console.log(this);
    this.divInputSearch.innerHTML = inputSearch();
    arrData.map((obj) => {
      console.log(obj);
      this.list.insertAdjacentHTML(
        "beforeend",
        `<li class="smallImages"> <img src="${obj.previewURL}" alt="${obj.tags}"></li>`
      );
    });
  };
}
new Gallery().fetchImages();
