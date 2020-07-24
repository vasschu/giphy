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
})();
