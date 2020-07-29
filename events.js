/* eslint-disable indent */
// this is where all events will go
import * as common from './common.js'
import {
  getTrending,
  getUploaded,
  getFavorite,
  searchGif
} from './service.js'
import {
  throttleFunction
} from './functions.js'

$(() => {
  common.$trendingGifs.click((e) => {
    e.preventDefault()
    common.$mainGifsContainer.empty();
    getTrending();
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
    });
  });

  (() => {
    let offset = 25;
    $(window).on('scroll', throttleFunction(() => {
      const scrollHeight = $(document).height();
      const scrollPos = $(window).height() + $(window).scrollTop();

      if (scrollHeight - scrollPos < 2400) {
        getTrending(offset);
        offset += 25;
      }
    }, 1200));
  })();

  common.$searchButton.click((e) => {
    e.preventDefault();
    common.$mainGifsContainer.empty();
    searchGif();
  });

  common.$searchField.on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault();
      common.$mainGifsContainer.empty();
      searchGif();
    }
  });


  $(document).on('click', '.single-gif', (event) => {
    const $gifId = $(event.target).attr('id')
    fetch(`${common.getGifsByIdEndpoint}${common.apiKey}&ids=${$gifId}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((res) => {
        res.forEach((element) => {
          if (element.id === $gifId) {
            // common.$mainGifsContainer.css('opacity')
            common.$displaySingleGifContainer.html(`
              <div style="background: pink; text-align:center;
              padding-top: 15px;padding-bottom: 15px;border-radius: 5px">
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
              `)
            $(document).on('click', '#add-favorites-button', () => {
              localStorage.setItem(`favorite-id`, $gifId)
            })
            $(document).on('click', '#remove', () => {
              localStorage.removeItem(`favorite-id`, $gifId)
            })
          }
        });
      });
    // $(document).on('click', '#main-body', () => {
    // common.$displaySingleGifContainer.empty();
    // })
  });
});
