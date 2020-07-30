import {
  throttleFunction,
} from './functions.js'

export const getTrendingGifs = (callback, ...args) => $(document).on('click', '#trending, .navbar-left-logo', () => callback(...args));
export const getFavoriteGifs = (callback) => $(document).on('click', '#favorites', callback);
export const getUploadedGifs = (callback) => $(document).on('click', '#upload', callback);
export const getSearchGifsClick = (callback) => $(document).on('click', '#submit-search-button', callback);
export const getSearchGifsKey = (callback) => $(document).on('keypress', '#search-field', callback);
export const uploadGifEvent = (callback) => $(document).on('change', '#file-upload-box', callback);
export const submitUploadGifEvent = (callback) => $(document).on('click', '#submit-upload-button', callback);
export const infiniteScrollEvent = (callback) => $(window).on('scroll', throttleFunction((callback), 1200));
export const clearSingleContainerEvent = (callback) => $(document).on('click', '.container', callback);
export const onClickAddFavEvent = (callback) => $(document).on('click', '#add-favorites-button', callback);
export const onClickRemoveFavEvent = (callback) => $(document).on('click', '#remove', callback);
export const openSingleGifDetailsEvent = (callback) => $(document).on('click', '.single-gif', callback);

