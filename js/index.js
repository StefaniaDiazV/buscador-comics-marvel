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