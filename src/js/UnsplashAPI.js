export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
    #query = '';
  getPopularImages(page) {
    const url = `${
      this.#BASE_URL
    }?query=popular&page=${page}&per_page=12&orientation=portrait&client_id=${
      this.#API_KEY
    }`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  getImagesByQuery(page) {
    const url = `${
      this.#BASE_URL
    }?query=${this.#query}&page=${page}&per_page=12&orientation=portrait&client_id=${
      this.#API_KEY
    }`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

    set query(newQuery) { 
        this.#query = newQuery;
    }
    
}

