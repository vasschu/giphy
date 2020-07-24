/// this is where fetch requests will go
import * as common from './common.js'
import { visualizeGif } from './functions.js'
  
(() => {
    const $body = $('body')
    fetch(`${common.trendingEndpoint}${common.apiKey}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(res => {
      res.forEach(element => visualizeGif(element.images.fixed_height.url, $body));
    });
})();

