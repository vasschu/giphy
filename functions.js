// this is where all functions will go

export const visualizeGif = (gif, container) => {
  const $div = $(container);
  $div.append(`
    <div style="display: inline-block; margin:15px;
     object-fit: cover"><img src="${gif}"></div>
    `);
};

