/// this is where fetch requests will go
import * as common from './common.js'
import { visualizeGif } from './functions.js'
  
export const getTrending = () => {
    const $body = $('.main-gif-container')
    fetch(`${common.trendingEndpoint}${common.apiKey}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(res => {
      res.forEach(element => visualizeGif(element.images.fixed_height.url, $body));
    });
};
getTrending()