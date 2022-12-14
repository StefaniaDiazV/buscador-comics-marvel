const createUrlId = (comicId, type, subResourse, page) => {
    const offSet = (page - 1) * 20;
    let url =  `${baseUrl}/${type}/`;
    url +=   `${comicId}`;
    if (subResourse) {
      url += `/${subResourse}`;
    };
    url +=  `?apikey=${apiPublic}&offset=${offSet}`;
    return url;
};

const loadComic = async () => {
    const params = new URLSearchParams(window.location.search);
    const{
        data: {
          results: [comic],
        },
      } = await fetchUrl(createUrlId(params.get('comicId'), params.get('type')));
    printComic(comic);
}

const loadComicCharacthers = async () => {
  showLoader();
  const params = new URLSearchParams(window.location.search);
  const response = await fetchUrl(createUrlId(params.get('comicId'), params.get('type'), 'characters', params.get('page') || 1));
  const data = response.data;
  const results = data.results;
  resultsCount = data.total;
  hideLoader();
  updateResultsCounter(resultsCount, 'Personajes');
  printCharacters(results);
};

const loadCharacter = async () => {
    const params = new URLSearchParams(window.location.search);
    const {
      data: {
        results: [character],
      },
    } = await fetchUrl(createUrlId(params.get('characterId'), params.get('type'))); 
    const coverPath = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    characterDetails(character.name, coverPath, character.description);
};

const loadCharacterComics = async () => {
  showLoader();
  const params = new URLSearchParams(window.location.search);
  const response = await fetchUrl(createUrlId(params.get('characterId'), params.get('type'), 'comics', params.get('page')));
  const data = response.data;
  const results = data.results;
  resultsCount = data.total;
  hideLoader();
  updateResultsCounter(resultsCount, 'Comics');
  printComics(results);
}; 

btnBack.addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
      params.delete('type');
      params.delete('comicId');
      params.delete("order");
      params.delete("characterId");
      params.set('page', 1);
      window.location.href = window.location.pathname + './../index.html?' + params.toString(); 
  })

const searchById = () => {
    const params = new URLSearchParams(window.location.search);
    if(params.get('type') === 'comics'){
        loadComic();
        loadComicCharacthers();
    } else if (params.get('type') === 'characters'){
        loadCharacter();
        loadCharacterComics();
    };
  };

const init = () => {
    searchById();
    updatePaginationFunction();
    updatePagination();
};

window.onload = init();