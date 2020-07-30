/* eslint-disable max-len */
// default index export script file;
import {
  getTrending,
  getFavorite,
  getUploaded,
  searchGif
} from './service.js';
import {
  uploadGifFunction,
  infiniteScrollFunction,
  clearSingleContainerFunction,
  addToFavoritesFunction,
  removeFavoriteFunction,
  clickSearch,
  enterKeySearch
} from './functions.js'
import {
  getTrendingGifs,
  getFavoriteGifs,
  getUploadedGifs,
  getSearchGifsClick,
  uploadGifEvent,
  infiniteScrollEvent,
  clearSingleContainerEvent,
  onClickAddFavEvent,
  onClickRemoveFavEvent,
  getSearchGifsKey
} from './events.js'
import * as common from './common.js'


$(() => {
  getTrending()

  getTrendingGifs(getTrending)

  getFavoriteGifs(getFavorite)

  getUploadedGifs(getUploaded)

  getSearchGifsClick(clickSearch)

  getSearchGifsKey(enterKeySearch)

  uploadGifEvent(uploadGifFunction)

  infiniteScrollEvent(infiniteScrollFunction)

  clearSingleContainerEvent(clearSingleContainerFunction)

  onClickAddFavEvent(addToFavoritesFunction)

  onClickRemoveFavEvent(removeFavoriteFunction)
});
