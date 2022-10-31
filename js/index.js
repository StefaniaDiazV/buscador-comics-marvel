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

// CARGAR PARAMS DESDE EL FORM  

formSearch.addEventListener('submit', e => {
    e.preventDefault();
    const orderBy = e.target["select-order"].value;
    const startWith = e.target["input-search"].value;
    const type = e.target["select-tipo"].value;
    const params = new URLSearchParams(window.location.search);
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