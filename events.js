/* eslint-disable indent */
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
  displaySearchWord
} from './functions.js'

let typeOfContent = 'trending';
let searchTerm = $('#search-field').val()
let searchOffset = 25;
let trendingOffset = 25;

$(() => {
  common.$trendingGifs.click((e) => {
    e.preventDefault()
    common.$mainGifsContainer.empty();
    getTrending();
    typeOfContent = 'trending';
  });

  common.$leftNavbarLogo.click((e) => {
    e.preventDefault()
    common.$mainGifsContainer.empty();
    getTrending();
  });

  common.$favoriteGifs.click((e) => {
    e.preventDefault();
    common.$mainGifsContainer.html(`
          <div class="favorite-gifs-container">
          </div>
        `);
    getFavorite();
  });

  common.$uploadGifs.click((e) => {
    e.preventDefault();
    common.$mainGifsContainer.html(`
          <div class="upload-gif-container">
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
          </div>
        `);
    getUploaded();
  });

  $(document).on('change', '#file-upload-box', (event) => {
    const uploadedGif = event.target.files[0];
    const newForm = new FormData();
    newForm.append('file', uploadedGif);

    $('#submit-upload-button').click(() => {
      fetch(`${common.uploadEndpoint}${common.apiKey}`, {
          method: 'POST',
          body: newForm,
        })
        .then((res) => res.json())
        .then((data) => data.data)
        .then((data) => localStorage.setItem('id', data.id))
        getUploaded();
    });
  });

  (() => {
    $(window).on('scroll', throttleFunction(() => {
      const scrollHeight = $(document).height();
      const scrollPos = $(window).height() + $(window).scrollTop();
      if (scrollHeight - scrollPos < 2400) {
        if (typeOfContent === 'search') {
          trendingOffset = 25;
          searchGif(searchTerm, searchOffset);
          searchOffset += 25;
        }
        if (typeOfContent === 'trending') {
          searchOffset = 25;
          getTrending(trendingOffset);
          trendingOffset += 25;
        }
      }
    }, 1200));
  })();

  //event trigering search on button click.
  common.$searchButton.click((e) => {
    e.preventDefault();
    common.$mainGifsContainer.empty();
    searchTerm = $('#search-field').val()
    displaySearchWord(searchTerm, common.$mainGifsContainer)
    searchGif(searchTerm);
    typeOfContent = 'search';
    searchOffset = 25;
  });

  // event trigering search on enter
  common.$searchField.on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault();
      common.$mainGifsContainer.empty();
      searchTerm = $('#search-field').val()
      displaySearchWord(searchTerm, common.$mainGifsContainer)
      searchGif(searchTerm);
      typeOfContent = 'search';
      searchOffset = 25;
    }
  });

  // the event that trigers to open signel gif details
  $(document).on('click', '.single-gif', (event) => {
    const $gifId = $(event.target).attr('id')
    openGif($gifId)
    $('.container').css('z-index', '5')
  });
});
