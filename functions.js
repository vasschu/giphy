/* eslint-disable indent */
/* eslint-disable max-len */
// this is where all functions will go
import * as common from './common.js'

export const visualizeGif = (gifId, gif, container) => {
  const $div = $(container);
  $div.append(`
  <div class="single-gif" style="display: inline-block;margin:15px">
  <img src="${gif}" id="${gifId}";>
  </div>
  `);
};

export const throttleFunction = (func, delay) => {
  let timerId = null;
  return () => {
    if (timerId === null) {
      func();
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    }
  };
};


export const openGif = (id) => {
  fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${id}`)
    .then((res) => res.json())
    .then((data) => data.data)
    .then((res) => {
      res.forEach((element) => {
        if (element.id === id) {
          common.$mainGifsContainer.css('pointer-events', 'none').css('opacity', '0.5').css('filter', 'blur(3px)')
          common.$displaySingleGifContainer.html(`
        <div style="background: pink; text-align:center;
        padding-top: 15px;padding-bottom: 15px;border-radius: 5px;">
        <h2>${element.title}</h2>
          <div>
          <img src="${element.images.downsized_large.url}">
          </div>
          <div>
          <button id="add-favorites-button">LIKE</button>
          <button id="link-to-giphy">Link to giphy</button>
          <button id="remove">remove from favorites</button>
          </div>
          <div style ="left: 0;
          right: 0; 
          top: 0;
          bottom: 0;
          margin: auto;">
        </div>
        `);
          $(document).on('click', '#main-body', () => {
            common.$mainGifsContainer.css('pointer-events', '').css('opacity', '').css('filter', 'blur(0)');
            common.$displaySingleGifContainer.empty();
          });
          $(document).on('click', '#add-favorites-button', () => {
            localStorage.setItem(`favorite-id`, id);
          });
          $(document).on('click', '#remove', () => {
            localStorage.removeItem(`favorite-id`, id);
          });
        }
      });
    });
}

export const displaySearchWord = (searchWord, body) => {
  body.prepend(`
  <div class="search-info">
  <h2>Search results for: <span style="color:grey">${searchWord}</span></h2>
  </div>
  `);
}
