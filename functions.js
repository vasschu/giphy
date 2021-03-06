import * as common from './common.js'
import {
  displaySingleGifView, displaySingleGifViewWithRemove
} from './views.js'
import {
  getTrending,
  searchGif
} from './service.js'

/**
 * This is the function that populates the main gif container with the results form the Giphy api.
 * @param {string} gifId is the Giphy ID provided by the api and assign it to the HTML element.
 * @param {string} gifURL is the URL adress of the gif to visualize. The adress is provided by the giphy API.
 * @param {string} container Specifies the html container where to populate the gifs
 * @return {void} functions populates the gif container. Function returns undefined.
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

/**
 * Clears the container used for displaying single gifs.
 * @returns {void} returns the empty container
 */

export const clearSingleContainerFunction = () => {
  common.$mainGifsContainer.css('pointer-events', '').css('opacity', '').css('filter', 'blur(0)');
  $('.container').css('z-index', '-5')
  $('.navbar-main').css('z-index', '4')
  common.$displaySingleGifContainer.empty();
}

/**
 * retrieves the information for each gif using the Giphy API key
 * @param {string} id the unique ID for each gif
 * @returns {function} function displaying 
 */

export const openGif = (id) => {
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${id}`)
    .then((res) => res.json())
    .then((data) => data.data) // service
    .then((res) => {
      if (localStorage.getItem('type-of-content') === 'favorites') {
        res.forEach((element) => {
          displaySingleGifViewWithRemove(element);
        })
      } else {
        res.forEach((element) => {
          displaySingleGifView(element);
        })
      }
    });
}

/**
 * Removes the selected gif from favorites section
 * @returns {function} that modifies the favorites section
 */

export const removeFavoriteFunction = () => {
  const favoriteId = $(event.target).attr('class');
  const favorites = localStorage.getItem(`favorite-id`).split(',');
  const result = favorites.filter((element) => element === favoriteId)
  const index = favorites.findIndex((element) => element === result.join(','))
  favorites.splice(index, 1);
  localStorage.setItem('favorite-id', favorites);
}

/**
 * Display the word we searched for before the results of the search.
 * @param {string} searchWord is the string we are searching for. It is extracted from the search input field.
 * @param {jQuerry element} htmlElement is the element where the text will be inserted as prepend (on the top)
 * @return {void} functions modifies the HTML and returns undefined.
 */

export const displaySearchWord = (searchWord, htmlElement) => {
  htmlElement.prepend(`
  <div class="search-info">
  <h2>Search results for: <span style="color:grey">${searchWord}</span></h2>
  </div>
  `);
}

/**
 * performs a check confirming that the gif is not allready in the favorites section and adds it
 * @param {event} event occuring when the action "add to favorites" is performed with the gif
 * @returns {function} function that appends the item to the favorites section
 */

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

/**
 * uploads a file from your computer to the website's local storage
 * @param {event} event occuring when an action is performed with the selected file
 * @returns {void} the uploaded file
 */

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

/**
 * performs a check confirming that the file is not allready uploaded on the websites local storage and uploads it
 * @param {string} data files' meta data
 * @returns {void} the uploaded file
 */

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
let searchTerm = $('#search-field').val();
/**
 * function generating endless amount of gifs upon scroll
 * @returns {void} the generated gifs visualized in the main gif container
 */

export const infiniteScrollFunction = () => {
  const scrollHeight = $(document).height();
  const scrollPos = $(window).height() + $(window).scrollTop();
  if (scrollHeight - scrollPos < 2400) {
    if (localStorage.getItem('type-of-content') === 'search') {
      trendingOffset = 25;
      searchGif(searchTerm, searchOffset);
      searchOffset += 25;
    }
    if (localStorage.getItem('type-of-content') === 'trending') {
      searchOffset = 25;
      getTrending(trendingOffset);
      trendingOffset += 25;
    }
  }
};

/**
 * serches for a gif, specified in the serch box by keyword
 * @param {event} event occuring when an action is performed with the selected mouse button
 * @returns {void} returns the searched keyword and the found content
 */

export const clickSearch = (event) => {
  event.preventDefault();
  common.$mainGifsContainer.empty();
  searchTerm = $('#search-field').val()
  displaySearchWord(searchTerm, common.$mainGifsContainer)
  searchGif(searchTerm);
  localStorage.setItem('type-of-content', 'search');
}

/**
 * serches for a gif, specified in the serch box by keyword
 * @param {event} event occuring when an action is performed with the selected keyboard key
 * @returns {void} returns the searched keyword and the found content
 */

export const enterKeySearch = (event) => {
  if (event.which === 13) {
    event.preventDefault();
    common.$mainGifsContainer.empty();
    searchTerm = common.$searchField.val()
    displaySearchWord(searchTerm, common.$mainGifsContainer)
    searchGif(searchTerm);
    localStorage.setItem('type-of-content', 'search');
  }
}

/**
 * Calls a function to open the gif details in a window, while pushing the other elements back in the z-index.
 * @param {event} event occuring when an action is performed with the selected target
 * @returns {void} returns the box with the gif details
 */
export const openSingleGifDetailsFunction = (event) => {
  const $gifId = $(event.target).attr('id');
  openGif($gifId);
  $('.container').css('z-index', '5');
  $('.navbar-main').css('z-index', '');
}