// this is where all constants will be declared

export const apiKey = 'api_key=7B0fC0XIQT4lIpcETj4FoZRjvantPCul';
export const trendingEndpoint = 'http://api.giphy.com/v1/gifs/trending?';
export const uploadEndpoint = 'https://upload.giphy.com/v1/gifs?';
export const searchEndpoint = 'http://api.giphy.com/v1/gifs/search?';
export const getGifsByIdEndpoint = 'https://api.giphy.com/v1/gifs?'
export const getRandomGifIdEndpoint = 'http://api.giphy.com/v1/gifs/random?'
export const queurySearchDeclaration = '&q=';
export const $uploadGifs = $('#upload');
export const $mainGifsContainer = $('.main-gif-container');
export const $trendingGifs = $('#trending');
export const $leftNavbarLogo = $('.navbar-left-logo');
export const $favoriteGifs = $('#favorites');
export const $uploadGifFileInputBox = $('#file-upload-box');
export const $searchButton = $('#submit-search-button');
export const $searchField = $('#search-field');
export const $displaySingleGifContainer = $('.display-single-gif-container');
export const $favoriteGifsContainer = $('.favorite-gifs-container');
export const $uploadedGifsContainer = $('.uploads-container');
export const uploadGifHTML = `<div class="upload-gif-container">
  <div>
    <h2>Upload a Gif</h2>
  </div>
  <div>
    <p>Uploading a gif is just as easy, as enjoying one.<p> 
  </div>
  <div>
    <input type="file" id="file-upload-box"
  </div>
  <div>
    <input type="submit" id="submit-upload-button" value="Upload">
  </div>
  <hr style="margin-top:50px"></hr>
  <div class="uploads-main-container">
    <div>
      <h2>My uploads</h2>
    </div>
    <div class="uploads-container">
    </div>
  </div>
</div>`
