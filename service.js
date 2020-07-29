/* eslint-disable indent */
/* eslint-disable max-len */
// / this is where fetch requests will go
import * as common from './common.js'
import {
  visualizeGif,
} from './functions.js'

export const getTrending = (offset = 0) => {
  const $body = $('.main-gif-container');
  fetch(`${common.trendingEndpoint}${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, $body))
    });
};
getTrending()
// ---------------

export const getFavorite = () => {
  const $body = $('.main-gif-container');
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('favorite-id')}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, $body));
    });
};
// ---------------
export const getUploaded = () => {
  const $body = $('.uploads-container');
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('id')}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, $body));
    })
};

export const searchGif = (offset = 0) => {
  let searchTerm = $('#search-field').val();
  const $body = $('.main-gif-container')
  $body.prepend(`
  <div class="search-info">
  <h2>Search results for: ${searchTerm}</h2>
  </div>
  `);
  fetch(`${common.searchEndpoint}${common.queurySearchDeclaration}${searchTerm}&${common.apiKey}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.id, element.images.fixed_height.url, $body));
    });
};
