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