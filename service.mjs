/// this is where fetch requests will go
import * as common from './common.mjs'
import { visualizeGif } from './functions.mjs'
  
(() => {
    const $body = $('body')
    fetch(`${common.trendingEndpoint}${common.apiKey}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(res => {
      res.forEach(element => visualizeGif(element.images.fixed_height.url, $body));
    })
    
})()

