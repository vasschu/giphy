/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable max-len */
// this is where all events will go
import * as common from './common.js'
import {
  getTrending,
  getUploaded,
  getFavorite,
  searchGif,
} from './service.js'
import {
  throttleFunction,
  openGif,
  displaySearchWord,
  uploadGifLocalStorageId
} from './functions.js'

let typeOfContent = 'trending';
let searchTerm = $('#search-field').val()
// let searchOffset = 25;
// let trendingOffset = 25;

export const getTrendingGifs = (callback) => $(document).on('click', '#trending, .navbar-left-logo', callback);
export const getFavoriteGifs = (callback) => $(document).on('click', '#favorites', callback);
export const getUploadedGifs = (callback) => $(document).on('click', '#upload', callback);
export const getSearchGifs = (callback) => $(document).on('click', '#submit-search-button', callback);
export const uploadGifEvent = (callback) => $(document).on('change', '#file-upload-box', callback);
export const submitUploadGifEvent = (callback) => $(document).on('click', '#submit-upload-button', callback);
export const infiniteScrollEvent = (callback) => $(window).on('scroll', throttleFunction((callback), 1200));
export const clearSingleContainerEvent = (callback) => $(document).on('click', '.container', callback);
// export const infiniteScrollFunction = () => {
//   const scrollHeight = $(document).height();
//     const scrollPos = $(window).height() + $(window).scrollTop();
//     if (scrollHeight - scrollPos < 2400) {
//       if (typeOfContent === 'search') {
//         trendingOffset = 25;
//         searchGif(searchTerm, searchOffset);
//         searchOffset += 25;
//       }
//       if (typeOfContent === 'trending') {
//         searchOffset = 25;
//         getTrending(trendingOffset);
//         trendingOffset += 25;
//       }
//     }
//   };


// (() => {
//     $(window).on('scroll', throttleFunction(() => {
//     const scrollHeight = $(document).height();
//     const scrollPos = $(window).height() + $(window).scrollTop();
//     if (scrollHeight - scrollPos < 2400) {
//       if (typeOfContent === 'search') {
//         trendingOffset = 25;
//         searchGif(searchTerm, searchOffset);
//         searchOffset += 25;
//       }
//       if (typeOfContent === 'trending') {
//         searchOffset = 25;
//         getTrending(trendingOffset);
//         trendingOffset += 25;
//       }
//     }
//   }, 1200));
// })();

  // event trigering search on button click.
  // common.$searchButton.click((e) => {
  //   e.preventDefault();
  //   common.$mainGifsContainer.empty();
  //   searchTerm = $('#search-field').val()
  //   displaySearchWord(searchTerm, common.$mainGifsContainer)
  //   searchGif(searchTerm);
  //   typeOfContent = 'search';
  // });

  // // event trigering search on enter
  // common.$searchField.on('keypress', function (e) {
  //   if (e.which === 13) {
  //     e.preventDefault();
  //     common.$mainGifsContainer.empty();
  //     searchTerm = common.$searchField.val()
  //     displaySearchWord(searchTerm, common.$mainGifsContainer)
  //     searchGif(searchTerm);
  //     typeOfContent = 'search';
  //   }
  // });

  // the event that trigers to open singel gif details
  $(document).on('click', '.single-gif', (event) => {
    const $gifId = $(event.target).attr('id')
    openGif($gifId)
    $('.container').css('z-index', '5')
  });

