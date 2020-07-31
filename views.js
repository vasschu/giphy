import * as common from './common.js'

/**
 * visualizes a single gif upon selection, displaying basic information for the selected gif
 * @param {jQuery} element the selected gif's data
 * @returns {HTMLDivElement} modified HTML window containing the gif, basic information for the gif and performable actions
 */

export const displaySingleGifView = (element) => {
    common.$mainGifsContainer.css('pointer-events', 'none').css('opacity', '0.5').css('filter', 'blur(3px)')
    common.$displaySingleGifContainer.html(`
        <div style="background: pink; text-align:center;
        padding-top: 15px;padding-bottom: 15px; padding-left: 25px;
        padding-right:25px;border-radius: 5px;">
        <h2>${element.title}</h2>
          <div>
          <img src="${element.images.downsized_large.url}">
          </div>
          <div>
          <button id="add-favorites-button" class="${element.id}" style="color:red">❤</button>
          <a href='${element.url}' id="link-to-giphy" target="_blank">Link to giphy</a>
          </div>
          <div style ="left: 0;
          right: 0; 
          top: 0;
          bottom: 0;
          margin: auto;">
        </div>
        `);
}

export const displaySingleGifViewWithRemove = (element) => {
  common.$mainGifsContainer.css('pointer-events', 'none').css('opacity', '0.5').css('filter', 'blur(3px)')
  common.$displaySingleGifContainer.html(`
      <div style="background: pink; text-align:center;
      padding-top: 15px;padding-bottom: 15px; padding-left: 25px;
      padding-right:25px;border-radius: 5px;">
      <h2>${element.title}</h2>
        <div>
        <img src="${element.images.downsized_large.url}">
        </div>
        <div>
        <button id="add-favorites-button" class="${element.id}" style="color:red">❤</button>
        <a href='${element.url}' id="link-to-giphy" target="_blank">Link to giphy</a>
        <button id="remove" class="${element.id}">remove from favorites</button>
        </div>
        <div style ="left: 0;
        right: 0; 
        top: 0;
        bottom: 0;
        margin: auto;">
      </div>
      `);
}


/**
 * Visualizes the gifs in the main gif container.
 * @param {string} gifId The unique ID for each gif
 * @param {string} gifURL The URL adres for each gif
 * @param {HTMLDivElement} container The main gif container
 * @returns {HTMLDivElement} the modified container
 */

export const visualizeGif = (gifId, gifURL, container) => {
    const $div = $(container);
    $div.append(`
    <div class="single-gif" style="display: inline-block;margin:15px">
    <img src="${gifURL}" id="${gifId}";>
    </div>
    `);
  };
