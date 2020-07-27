/* eslint-disable max-len */
// this is where all functions will go

export const visualizeGif = (gifId, gif, container) => {
  const $div = $(container);
  $div.append(`
  <div class="single-gif" style="display: inline-block;margin:15px">
  <img src="${gif}" id="${gifId}";>
  </div>
  `);
};

export const throttleFunction = (func, delay) => {
  let timerId = null;
  return () => {
    if (timerId === null) {
      func();
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    }
  };
};
