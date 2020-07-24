// this is where all functions will go

export const visualizeGif = (gif, container) => {
    const $div = $(container);
    $div.append(`
      <span><img src="${gif}"></span>
    `);
};

