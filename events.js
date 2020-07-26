// this is where all events will go
import * as common from './common.js'
import { getTrending } from './service.js'

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
          </div>
        `);
  });

  $(document).on('change', '#file-upload-box', (event) => {
    const uploadedGif = event.target.files[0];
    const newForm = new FormData();
    newForm.append( 'file', uploadedGif );

    $('#submit-upload-button').click(() => {
      fetch(`${common.uploadEndpoint}${common.apiKey}`, {
        method: 'POST',
        body: newForm,
      })
          .then((res) => res.json())
          .then((data) => console.log(data))
    });
  });
});

