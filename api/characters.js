const printCharacters = (characters) => {
    clearResults();
      if (characters.length === 0) {
        cardGroup.innerHTML =
          '<h2 class="no-lenght fw-bold fs-5">No hemos encontrado resultados</h2>';
      };
      characters.forEach(character => {
        const characterCard = document.createElement("div");
        characterCard.tabIndex = 0;
        characterCard.classList.add("comic");
        const div1 = document.createElement("div");
        div1.classList.add("d-flex");
        div1.classList.add("flex-wrap");
        const divCard = document.createElement('div');
        divCard.classList.add("card");
        divCard.classList.add("card-personaje");
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.classList.add('imagen'),
        img.setAttribute('src', `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`);
        img.setAttribute('alt', `${character.name}`);
        const divText = document.createElement('div');
        divText.classList.add('card-body','nombre-personaje', 'text-white', 'fw-bold', 'text-uppercase', 'border-top', 'border-danger', 'border-4');
        const name = document.createElement('p');
        name.classList.add('card-text');
        const text = document.createTextNode(character.name);
    
        name.appendChild(text);
        divText.appendChild(name);
        divCard.appendChild(img);
        divCard.appendChild(divText);
        div1.appendChild(divCard);
        characterCard.appendChild(div1);
        characterCard.addEventListener('click', () => {
          const params = new URLSearchParams(window.location.search);
          params.delete("order");
          params.delete("page");
          params.set('type', 'characters');
          params.set('characterId', character.id);
          params.set('page', 1);
          window.location.href = window.location.host + './../details.html?' + params.toString(); 
        });
        cardGroup.append(characterCard)
      })
    };
    
const characterDetails = (name, image, description) => {
  characterSection.classList.remove('d-none');
  characterImg.src = image;
  characterName.innerHTML = name;
  characterDescription.innerHTML = description;
};