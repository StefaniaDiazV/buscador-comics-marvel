// CREAR OPTIONS - SELECT ORDER 

const createSelect = () => {
    if(selectType.value === 'comics'){
      selectOrder.innerHTML = `
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
      <option value="-focDate">Más nuevos</option>
      <option value="focDate">Más viejos</option>`
      };
    if(selectType.value === 'characters'){
        selectOrder.innerHTML = `
        <option value="name">A-Z</option>
        <option value="-name">Z-A</option>`
    };
    };
    
    selectType.addEventListener('change', () => {
     createSelect();
    })

    const updateSelectType = () => {
      const params = new URLSearchParams(window.location.search);
      selectType.querySelector(`option[value="${params.get("type") || 'comics'}"]`).setAttribute("selected", "selected");
    };
    const updateSelecOrder = () => {
      const params = new URLSearchParams(window.location.search);
      selectOrder.querySelector(`option[value="${params.get("order") || 'title'}"]`).setAttribute("selected", "selected");
    };

    const uptadeInputSearch = () => {
      const params = new URLSearchParams(window.location.search);
      inputSearch.value = `${params.get("search") || ''}`;
    };

// CARGAR PARAMS DESDE EL FORM  

formSearch.addEventListener('submit', e => {
    e.preventDefault();
    const orderBy = e.target["select-order"].value;
    const startWith = e.target["input-search"].value;
    const type = e.target["select-tipo"].value;
    const params = new URLSearchParams(window.location.search);
    params.delete('search')
    if(e.target["input-search"].value){
      params.set('search', startWith);
    } else{
      ''
    };
    params.set('type', type);
    params.set('order', orderBy);
    params.set('page', page);
    window.location.href = window.location.pathname + '?' + params.toString();
  })

  // FETCH COMICS

const fetchComics = async () => {
    showLoader();
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    const response = await fetchUrl(createUrl('comics',page, params.get('order') || "title",params.get('search')));
    const data = response.data;
    const comics = data.results;
    resultsCount = data.total;
    updateResultsCounter(resultsCount, 'Resultados');
    hideLoader();
    printComics(comics);
  };
  
  // FETCH CHARACTERS
  
  const fetchCharacters = async () => {
    showLoader();
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    const response = await fetchUrl(createUrl('characters',page, params.get('order') || "title",params.get('search')));
    const data = response.data;
    const characters = data.results;
    resultsCount = data.total;
    updateResultsCounter(resultsCount, 'Resultados');
    hideLoader();
    printCharacters(characters);
  };
  
  const search = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === "comics"){
      fetchComics();
    };
    if (params.get('type') === "characters") {
      fetchCharacters();
    } else{
      fetchComics();
    };
  };
  
  btnSearch.addEventListener("click", () => {
    search();
  })
  
  const init = () => {
    updateSelectType();
    createSelect();
    updateSelecOrder();
    uptadeInputSearch();
    search();
    updatePaginationFunction();
    updatePagination();
  };
  
  window.onload = init;