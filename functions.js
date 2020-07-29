/* eslint-disable indent */
/* eslint-disable max-len */
// this is where all functions will go
import * as common from './common.js'
import {
  getFavorite
} from './service.js';


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

export const openGif = (id) => {
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${id}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => {
        if (element.id === id) {
          common.$mainGifsContainer.css('pointer-events', 'none').css('opacity', '0.5').css('filter', 'blur(3px)')
          common.$displaySingleGifContainer.html(`
        <div style="background: pink; text-align:center;
        padding-top: 15px;padding-bottom: 15px; padding-left: 25px;
        padding-right:25px;border-radius: 5px;">
        <h2>${element.title}</h2>
          <div>
          <img src="${element.images.downsized_large.url}">
          </div>
          <div>
          <button id="add-favorites-button" style="color:red">❤</button>
          <button id="link-to-giphy">Link to giphy</button>
          <button id="remove">remove from favorites</button>
          </div>
          <div style ="left: 0;
          right: 0; 
          top: 0;
          bottom: 0;
          margin: auto;">
        </div>
        `);
          $(document).on('click', '.container', () => {
            common.$mainGifsContainer.css('pointer-events', '').css('opacity', '').css('filter', 'blur(0)');
            $('.container').css('z-index', '-5')
            common.$displaySingleGifContainer.empty();
          })
          $(document).on('click', '#add-favorites-button', () => {
            let favorites = (localStorage.getItem('favorite-id'));
            if (favorites === '' || favorites === null) {
              localStorage.setItem('favorite-id', id);
            } else {
              favorites = (localStorage.getItem('favorite-id')).split(',');
              if (!favorites.includes(id)) {
                favorites.push(id);
              }
              localStorage.setItem(`favorite-id`, favorites);
            }
          });
          $(document).on('click', '#remove', () => {
            localStorage.removeItem(`favorite-id`, id);
          });
        }
      });
    });
}


/**
 * Display the word we searched for in fornt of the search results.
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

/**
 * Check if the search field has input.
 * @return {Boolean} True if the input field has string, false if not.
 */

export const isSearchValid = () => {
  if (common.$searchField.val() !== '') {
    return true
  }
  return false
}
