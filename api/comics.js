const printComics =  async (comics) => {
    clearResults();
    if (comics.length === 0) {
      cardGroup.innerHTML = '<h2 class="no-lenght fw-bold fs-5">No hemos encontrado resultados</h2>';
    };
    comics.forEach(comic => {
      const comicCard = document.createElement('div');
      comicCard.tabIndex = 0;
      comicCard.classList.add("comic");
      comicCard.setAttribute("id", "comics-result");
  
      const imgBox = document.createElement("div");
      imgBox.classList.add('comic-img-container');
      const comicImg = document.createElement('img')
      comicImg.setAttribute('src', `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`);
      comicImg.setAttribute('alt', `${comic.title}`);
      comicImg.classList.add('comic-thumbnail');
      const comicTitle = document.createElement('p');
      comicTitle.classList.add('comic-title');
      const titleText = document.createTextNode(comic.title);
  
      imgBox.appendChild(comicImg);
      comicTitle.appendChild(titleText);
      comicCard.appendChild(imgBox);
      comicCard.appendChild(comicTitle);
      comicCard.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        params.set('type', 'comics');
        params.set('comicId', comic.id);
        params.delete("order");
        params.delete("page");
        params.set('page', 1);
        window.location.href = window.location.pathname + './../details.html?' + params.toString(); 
      });
      cardGroup.append(comicCard);
    })
  }