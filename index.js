import {
  getTrending,
  getFavorite,
  getUploaded
} from './service.js';

import {
  uploadGifFunction,
  infiniteScrollFunction,
  clearSingleContainerFunction,
  addToFavoritesFunction,
  removeFavoriteFunction,
  clickSearch,
  enterKeySearch,
  openSingleGifDetailsFunction
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
  getSearchGifsKey,
  openSingleGifDetailsEvent
} from './events.js'



$(() => {
  getTrending()

  getTrendingGifs(getTrending, null, true);

  getFavoriteGifs(getFavorite);

  getUploadedGifs(getUploaded);

  getSearchGifsClick(clickSearch);

  getSearchGifsKey(enterKeySearch);

  uploadGifEvent(uploadGifFunction);

  infiniteScrollEvent(infiniteScrollFunction);

  clearSingleContainerEvent(clearSingleContainerFunction);

  onClickAddFavEvent(addToFavoritesFunction);

  onClickRemoveFavEvent(removeFavoriteFunction);

  openSingleGifDetailsEvent(openSingleGifDetailsFunction);
});
