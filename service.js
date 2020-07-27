/* eslint-disable max-len */
// / this is where fetch requests will go
import * as common from './common.js'
import {
  visualizeGif
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
  const $body = $('.favorite-gif-container')
  fetch(`${common.getGifByIdEndpoint}${common.apiKey}&ids=${localStorage.getItem('id')}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => visualizeGif(element.images.fixed_height.url, $body));
    });
};
getFavorite();
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

export const searchGif = () => {
  let searchTerm = $('#search-field').val();
  const $body = $('.main-gif-container')
  fetch(`${common.searchEndpoint}${common.queurySearchDeclaration}${searchTerm}&${common.apiKey}&limit=30`)
    .then(res => res.json())
    .then(data => data.data)
    .then(res => {
      res.forEach(element => visualizeGif(element.id, element.images.fixed_height.url, $body));
    });
};
