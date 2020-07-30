/* eslint-disable indent */
/* eslint-disable max-len */
// this is where all functions will go
import * as common from './common.js'
import { displaySingleGifView } from './views.js'
import { getTrending, searchGif } from './service.js'

/**
 * This is the function that populates the main gif container with the results form the Giphy api.
 * @param {string} gifId is the Giphy ID provided by the api and assign it to the HTML element.
 * @param {string} gifURL is the URL adress of the gif to visualize. The adress is provided by the giphy API.
 * @param {string} container Specifies the html container where to populate the gifs
 * @return {undefined} functions populates the gif container. Function return undefined.
 */
export const visualizeGif = (gifId, gifURL, container) => {
  const $div = $(container);
  $div.append(`
  <div class="single-gif" style="display: inline-block;margin:15px">
  <img src="${gifURL}" id="${gifId}";>
  </div>
  `);
};

/**
 * Get data from Giphy using Trenidng Gifs endpoint with our api_key.
 * @param {function} func is function populating the main gif cotnainer withthe Giphy ID provided by the api and assign it to the HTML element.
 * @param {number} delay is the number of mili seconds to delay the execution. This limits the number of requests send to Giphy.
 * @return {function} functions that must fetch new data from Giphy and append to the main gif container.
 */
export const throttleFunction = (func, delay) => {
  let timerId = null;
  return () => {
    if (timerId === null) {
      func();
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    }
  };
};

export const clearSingleContainerFunction = () => {
  common.$mainGifsContainer.css('pointer-events', '').css('opacity', '').css('filter', 'blur(0)');
    $('.container').css('z-index', '-5')
    common.$displaySingleGifContainer.empty();
}

export const openGif = (id) => {
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${id}`)
    .then((res) => res.json())
    .then((data) => data.data) // service
    .then((res) => {
      res.forEach((element) => {
        displaySingleGifView(element);
      })
    });
}

export const removeFavoriteFunction = () => {
  const favoriteId = $(event.target).attr('class');
  const favorites = localStorage.getItem(`favorite-id`).split(',');
  const result = favorites.filter((element) => element === favoriteId)
  const index = favorites.findIndex((element) => element === result.join(','))
  favorites.splice(index, 1);
  localStorage.setItem('favorite-id', favorites);
}

// $(document).on('click', '#remove', () => {
//   const favoriteId = $(event.target).attr('class');
//   const favorites = localStorage.getItem(`favorite-id`).split(',');
//   const result = favorites.filter((element) => element === favoriteId)
//   const index = favorites.findIndex((element) => element === result.join(','))
//   favorites.splice(index, 1);
//   localStorage.setItem('favorite-id', favorites);
// });
/**
* Display the word we searched for before the results of the search.
* @param {string} searchWord is the string we are searching for. It is extracted from the search input field.
* @param {jQuerry element} htmlElement is the element where the text will be inserted as prepend (on the top)
* @return {undefined} functions modifies the HTML and returns undefined.
*/

export const displaySearchWord = (searchWord, htmlElement) => {
  htmlElement.prepend(`
  <div class="search-info">
  <h2>Search results for: <span style="color:grey">${searchWord}</span></h2>
  </div>
  `);
}

export const addToFavoritesFunction = (event) => {
  const favoriteGif = $(event.target).attr('class');
  let favorites = (localStorage.getItem('favorite-id'));
    if (favorites === '' || favorites === null) {
      localStorage.setItem('favorite-id', favoriteGif);
    } else {
      favorites = (localStorage.getItem('favorite-id')).split(',');
      if (!favorites.includes(favoriteGif)) {
        favorites.push(favoriteGif);
      }
      localStorage.setItem(`favorite-id`, favorites);
    }
}

export const uploadGifFunction = (event) => {
  const uploadedGif = event.target.files[0];
    const newForm = new FormData();
    newForm.append('file', uploadedGif);
    $('#submit-upload-button').click(() => {
      fetch(`${common.uploadEndpoint}${common.apiKey}`, {
          method: 'POST',
          body: newForm,
        })
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) => uploadGifLocalStorageId(data))
    });
}

export const uploadGifLocalStorageId = (data) => {
  let uploads = (localStorage.getItem('upload-id'));
  if (uploads === '' || uploads === null) {
    localStorage.setItem('upload-id', data.id);
  } else {
    uploads = (localStorage.getItem('upload-id')).split(',');
    if (!uploads.includes(data.id)) {
      uploads.push(data.id);
    }
    localStorage.setItem('upload-id', uploads);
  }
}

let trendingOffset = 25;
let searchOffset = 25;
let typeOfContent = 'trending';
let searchTerm = $('#search-field').val()

export const infiniteScrollFunction = () => {
  const scrollHeight = $(document).height();
    const scrollPos = $(window).height() + $(window).scrollTop();
    if (scrollHeight - scrollPos < 2400) {
      if (typeOfContent === 'search') {
        trendingOffset = 25;
        searchGif(searchTerm, searchOffset);
        searchOffset += 25;
      }
      if (typeOfContent === 'trending') {
        searchOffset = 25;
        getTrending(trendingOffset);
        trendingOffset += 25;
      }
    }
  };

  common.$searchButton.click((e) => {
    e.preventDefault();
    common.$mainGifsContainer.empty();
    searchTerm = $('#search-field').val()
    displaySearchWord(searchTerm, common.$mainGifsContainer)
    searchGif(searchTerm);
    typeOfContent = 'search';
  });

  // event trigering search on enter
  common.$searchField.on('keypress', function(e) {
    if (e.which === 13) {
      e.preventDefault();
      common.$mainGifsContainer.empty();
      searchTerm = common.$searchField.val()
      displaySearchWord(searchTerm, common.$mainGifsContainer)
      searchGif(searchTerm);
      typeOfContent = 'search';
    }
  });
