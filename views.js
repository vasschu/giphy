/* eslint-disable indent */
/* eslint-disable max-len */
import { visualizeGif } from './functions.js';
import * as common from './common.js'

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
          <button id="add-favorites-button" style="color:red">❤</button>
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
}
