import * as common from './common.js'
import {
  visualizeGif
} from './views.js'
/**
 * Get data from Giphy using Trenidng Gifs endpoint with our api_key.
 * @param {number} offset Specifies the starting position of the results. Defaults to 0.
 * @return {undefined} functions populates the main gif container with the results by calling the visualizeGif function. Function return undefined.
 */
export const getTrending = (offset = 0, empty) => {
  if (empty) {
    common.$mainGifsContainer.empty();
  }
  return fetch(`${common.trendingEndpoint}${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
    });
};

/**
 * Get data from Giphy using Get Gifs by ID endpoint with our api_key. Visualize GIFs marked as favorite. Favorite gifs are stored in local storage.
 *
 * @return {undefined} functions populates the main gif container with the results by calling the visualizeGif function.  Function return undefined.
 */
export const getFavorite = () => {
  common.$mainGifsContainer.empty()
  if (!localStorage.getItem('favorite-id') === false) {
    fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('favorite-id')}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((res) => {
        res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
      });
  } else {
    fetch(`${common.getRandomGifIdEndpoint}${common.apiKey}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((res) => {
        visualizeGif(res.id, res.fixed_height_small_url, common.$mainGifsContainer);
      })
  }
}
/**
 * Get data from Giphy using Get Gifs by ID endpoint with our api_key. Visualize GIFs uploaded with our api key. Uploaded gifs are stored in local storage.
 *
 * @return {undefined} functions populates the main gif container with the results by calling the visualizeGif function.  Function return undefined.
 */
export const getUploaded = () => {
  common.$mainGifsContainer.empty()
  common.$mainGifsContainer.html(common.uploadGifHTML)
  return fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('upload-id')}`)
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
  return fetch(`${common.searchEndpoint}${common.queurySearchDeclaration}${searchTerm}&${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, common.$mainGifsContainer));
    });
};
