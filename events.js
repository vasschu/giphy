import {
  throttleFunction,
} from './functions.js'

/**
 * Binds an event handler to element with id "#trending".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const getTrendingGifs = (callback, ...args) => $(document).on('click', '#trending, .navbar-left-logo', () => callback(...args));
/**
 * Binds an event handler to element with id "#favorites".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const getFavoriteGifs = (callback) => $(document).on('click', '#favorites', callback);
/**
 * Binds an event handler to element with id "#upload".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const getUploadedGifs = (callback) => $(document).on('click', '#upload', callback);
/**
 * Binds an event handler to element with id "#submit-search-button".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const getSearchGifsClick = (callback) => $(document).on('click', '#submit-search-button', callback);
/**
 * Binds an event handler to element with id "#search-field".
 * @param { function } callback Function describing what should be done when the target is pressed.
 * @return { event } An event, binded to the target.
 */
export const getSearchGifsKey = (callback) => $(document).on('keypress', '#search-field', callback);
/**
 * Binds an event handler to element with id "#file-upload-box".
 * @param { function } callback Function describing what should be done when the target is pressed.
 * @return { event } An event, binded to the target.
 */
export const uploadGifEvent = (callback) => $(document).on('change', '#file-upload-box', callback);
/**
 * Binds an event handler to element with id "#submit-upload-button".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const submitUploadGifEvent = (callback) => $(document).on('click', '#submit-upload-button', callback);
/**
 * Binds an event handler to the window element.
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const infiniteScrollEvent = (callback) => $(window).on('scroll', throttleFunction((callback), 1200));
/**
 * Binds an event handler to element with class ".container".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const clearSingleContainerEvent = (callback) => $(document).on('click', '.container', callback);
/**
 * Binds an event handler to element with id "#add-favorites-button".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const onClickAddFavEvent = (callback) => $(document).on('click', '#add-favorites-button', callback);
/**
 * Binds an event handler to element with id "#remove".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const onClickRemoveFavEvent = (callback) => $(document).on('click', '#remove', callback);
/**
 * Binds an event handler to element with classs ".single-gif".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
export const openSingleGifDetailsEvent = (callback) => $(document).on('click', '.single-gif', callback);
