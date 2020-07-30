/* eslint-disable max-len */
// default index export script file;
import { getTrending, getFavorite, getUploaded, searchGif } from './service.js';
import { visualizeGif, uploadGifFunction, infiniteScrollFunction, clearSingleContainerFunction } from './functions.js'
import { getTrendingGifs, getFavoriteGifs, getUploadedGifs, getSearchGifs, uploadGifEvent, infiniteScrollEvent, clearSingleContainerEvent } from './events.js'
import * as common from './common.js'


$(() => {
  getTrending()

  getTrendingGifs(getTrending)

  getFavoriteGifs(getFavorite)

  getUploadedGifs(getUploaded)

  getSearchGifs(searchGif)

  uploadGifEvent(uploadGifFunction)

  infiniteScrollEvent(infiniteScrollFunction)

  clearSingleContainerEvent(clearSingleContainerFunction)
});
