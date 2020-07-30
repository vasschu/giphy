import * as common from './common.js'
import {
  visualizeGif
} from './views.js'
/**
 * Get data from Giphy using Trenidng Gifs endpoint with our api_key.
 * @param {number} offset Specifies the starting position of the results. Defaults to 0.
 * @return {void} functions populates the main gif container with the results by calling the visualizeGif function. Function return undefined.
 */
export const getTrending = (offset = 0, empty) => {
  localStorage.setItem('type-of-content', 'trending');
  if (empty) {
    common.$mainGifsContainer.empty();
  }
  fetch(`${common.trendingEndpoint}${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
    });
};

/**
 * Get data from Giphy using Get Gifs by ID endpoint with our api_key. Visualize GIFs marked as favorite. Favorite gifs are stored in local storage.
 *
 * @return {void} functions populates the main gif container with the results by calling the visualizeGif function.  Function return undefined.
 */
export const getFavorite = () => {
  common.$mainGifsContainer.empty()
  localStorage.setItem('type-of-content', 'favorites');
  if (!localStorage.getItem('favorite-id') === false) {
    const test = localStorage.getItem('favorite-id').split(',');
    test.forEach((element) => {
    fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${element}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((res) => {
        res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
      });
    })
  } else {
    common.$mainGifsContainer.empty()
    fetch(`${common.getRandomGifIdEndpoint}${common.apiKey}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((res) => {
        visualizeGif(res.id, res.images.fixed_height.url, common.$mainGifsContainer);
      })
  }
}
/**
 * Get data from Giphy using Get Gifs by ID endpoint with our api_key. Visualize GIFs uploaded with our api key. Uploaded gifs are stored in local storage.
 *
 * @return {void} functions populates the main gif container with the results by calling the visualizeGif function.  Function return undefined.
 */
export const getUploaded = () => {
  localStorage.setItem('type-of-content', 'upload');
  common.$mainGifsContainer.empty()
  common.$mainGifsContainer.html(common.uploadGifHTML)
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('upload-id')}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
    })
};

/**
 * Get data from Giphy using search argument and the search endpoint with our api_key
 *
 * @param {string} searchTerm word taken from the search input field.
 * @param {number} offset Specifies the starting position of the results. Defaults to 0.
 * @return {promise}
 */
export const searchGif = (searchTerm, offset = 0) => {
  localStorage.setItem('type-of-content', 'search');
  common.$mainGifsContainer.empty()
  fetch(`${common.searchEndpoint}${common.queurySearchDeclaration}${searchTerm}&${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
    });
};
