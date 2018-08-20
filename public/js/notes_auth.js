/* Shorten syntax */
let select = (sel) => { return document.querySelector(sel)};

let container = select('.container'),
    gen_btn = select('#gen_btn'),
    ent_Token = select('#ent_Token'),
    generate_header = select('#generate_header'),
    token_placement = select('#token_placement');

/* Generate random image on page reload */
window.onload = () => {
    let idName = 'image_'+Math.floor(1+Math.random() * 10);
    container.setAttribute('id', idName);
}

/* Generating the token and displaying it */
if(gen_btn !== null){
    gen_btn.onclick = () => {
        let xhr = new XMLHttpRequest;
        xhr.open('POST','/notes/register', true);
        xhr.onload = function () {
            if( this.status == 200){
                token_placement.value = this.responseText;
                gen_btn.style.display = 'none';
                ent_Token.style.display = 'block';
                generate_header.innerText = 'Copy the token and press Enter Token'
            }
        }
        xhr.send();
    }
}



