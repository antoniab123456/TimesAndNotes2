/* Shorten syntax */
let select = (sel) => { return document.querySelector(sel)};

let  container = select('.container');

/* Generate random image on page reload */
window.onload = () => {
    let idName = 'image_'+Math.floor(1+Math.random() * 5);
    container.setAttribute('id', idName);
}

