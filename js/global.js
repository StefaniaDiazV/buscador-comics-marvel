// API KEY 
const apiPublic = 'a1890e5dd97c5b76484b28df4d9d19a6';
const apiPrivate = '9b313195e110e6aa52038f8adc512a4ff7618c33';
const baseUrl = `https://gateway.marvel.com/v1/public/`;

//MAIN SECTIONS
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const comicSection = document.getElementById("section-comics");
const comicsGroup = document.getElementById("comics-result");
const characterSection = document.getElementById("section-personajes");

//SEARCH NAV
const formSearch = document.getElementById('form-search');
const selectOrder = document.getElementById('select-order');
const inputSearch = document.getElementById("input-search");
const selectType = document.getElementById("select-tipo");
const btnSearch = document.querySelector("#btn-search");

//SECTION RESULTS ELEMENTS
const resultsCounter = document.getElementById("results-counter");
const resultsNumber = document.querySelector(".results-number");
const resultsTitle = document.getElementById("results-title");
const cardGroup = document.getElementById("card-group");

// ELEMENTS COMIC SECTION
const btnBack = document.getElementById('back-btn')

const comicImg = document.querySelector(".comic-cover");
const comicTitle = document.querySelector(".comic-title");
const comicReleaseDate = document.querySelector(".comic-release-date");
const comicWriters = document.querySelector(".comic-writers");
const comicDescription = document.querySelector(".comic-description");

// ELEMENTS CHARACTER SECTION

const characterImg = document.querySelector(".character-img");
const characterName = document.querySelector(".character-name");
const characterDescription = document.querySelector(".character-description");
const loaderContainer = document.querySelector(".loader-container");

//LOADER

const hideLoader = () => loaderContainer.classList.add("d-none");
const showLoader = () => loaderContainer.classList.remove("d-none");


//PAGINATOR ELEMENTS
const firstPage = document.getElementById("first");
const previousPage = document.getElementById("previous");
const lastPage = document.getElementById("last");
const nextPage = document.getElementById("next");
const currentPageDiv = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");


//FOOTER ELEMENTS

const btnLore = document.getElementById("lore");
const btnStefa = document.getElementById("stefa");
const contactLore = document.getElementById("contact-lore");
const contactStefa = document.getElementById("contact-stefa");
const loreGithub = document.getElementById("lore-github");
const loreLinkedin = document.getElementById("lore-linkedin");
const stefaGithub = document.getElementById("stefa-github");
const stefaLinkedin = document.getElementById("stefa-linkedin");


let resultsCount = 0;
let page = 1;

// SEARCH API URL 

const searchByName = (type, title) => {
  if (title && type === "comics") {
   return `titleStartsWith=${title}&`;
 } else if (title &&  type === "characters") {
   return `nameStartsWith=${title}&`;
 } else {
   return "";
 };
};

const createUrl = (type, page, orderBy, title) => {
 const offSet = (page - 1) * 20;
 let url =  `${baseUrl}${type}?`;
 url +=   searchByName(type,title);
 url +=  `orderBy=${orderBy}&offset=${offSet}&apikey=${apiPublic}`;
 return url;
};

const fetchUrl = async (url) => {
 const response = await fetch(url);
 const data = await response.json();
 return data;
};

// RESULTS

const clearResults = () => {
    cardGroup.innerHTML = "";
  };

// PAGINATION UTILITIES

const updateResultsCounter = (count, title) => {
    resultsNumber.innerHTML = count;
    resultsTitle.innerHTML = title;
    updatePaginationData(count);
  };
  
  const updatePaginationData = (totalResults) => {
    const params = new URLSearchParams(window.location.search);
    const total = Math.ceil(totalResults / 20);
    totalPages.innerHTML = `${total}`;
    const currentPage = params.get('page') || 1;
    currentPageDiv.innerHTML = `${totalResults === 0 ? 0 : currentPage}`;
    updatePagination(total);
  };
  
  const updatePagination = (totalResults) => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('page') || params.get('page') === '1') {
      firstPage.disabled = true;
      previousPage.disabled = true;
    } else {
      firstPage.disabled = false;
      previousPage.disabled = false;
    };
    if (params.get('page') === String(totalResults) || totalResults === 0) {
      lastPage.disabled = true;
      nextPage.disabled = true;
    } else {
      lastPage.disabled = false;
      nextPage.disabled = false;
    };
  };

// PAGINATION BTN FUNCTION

const updatePaginationFunction = () => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page')) || 1;

  firstPage.onclick = () => {
    params.set('page', 1);
    window.location.href = window.location.pathname + '?' + params.toString();
  };

  previousPage.onclick = () => {
    params.set('page', page - 1);
    window.location.href = window.location.pathname + '?' + params.toString();
  }
  
  nextPage.onclick = () => {
    params.set('page', page + 1);
    window.location.href = window.location.pathname + '?' + params.toString();
  };

  lastPage.onclick = () => {
    let totalPages = Math.ceil(resultsCount / 20);
    params.set('page', totalPages);
    window.location.href = window.location.pathname + '?' + params.toString()
  };
};

body.style.background = "white";
body.style.backgroundImage = "white";
