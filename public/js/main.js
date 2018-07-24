let select = (sel) => { return document.querySelector(sel)};

let container = select('.container');

window.onload = () => {
    let idName = 'image_'+Math.floor(1 + Math.random() * 9);
    container.setAttribute('id', idName);
}