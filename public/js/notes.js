/* Shorten syntax */
let select = (sel) => { return document.querySelector(sel)};

let container = select('.container'),
    add_note_mode = select('#add_note_mode'),
    outside_note_options = select('#outside_note_options'),
    inner_note_text = select('#inner_note_text'),
    all_colors = select('#all_colors'),
    color = document.querySelectorAll('.color'),
    loc_symb_prev = document.querySelectorAll('.loc_symb_prev'),
    add_location = select('#add_location'),
    location_symb = select('.location_symb'),
    loc_symb = select('#loc_symb'),
    inner_note = select('#inner_note'),
    add_name = select('#add_name'),
    addNote = select('#addNote');


/*=========================================================================================*/
/* All the functions used below */

/* Class to send editting requests */
class Editor {
    constructor (field, route){
        this.field = field;
        this.route = route;
    }
    editNote(){
        if(this.field !== null){
            this.field.onchange = e => { 
                let inputObject = {
                    value: e.target.value
                };
                let xhr = new window.XMLHttpRequest()
                xhr.open('PUT', '/notes/'+this.route+'?note='+window.location.href.slice(38), true);
                xhr.onload = () => {
                    if(xhr.status == 200){
                        this.field.value = xhr.responseText;
                    }
                }
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                xhr.send(JSON.stringify(inputObject));
            }
        }
    }
}

/* Redirect to the google maps page with the params user entered by clicking on the loc button
Color the button/text and make it clickable*/
let getLocation = () => {
    /* Styles */
    loc_symb.style.color = 'rgb(9, 118, 133)';
    add_location.style.color = 'rgb(9, 118, 133)';
    add_location.style.textDecoration = 'underline';
    location_symb.onmouseover = () => {
        location_symb.style.cursor = 'pointer';
    }
    /* Functionality */
    location_symb.onclick = () => {
        let loc_val = add_location.value;
        window.open('https://www.google.com/maps?q='+loc_val.split(',')
        .map(param => {
            return param;
        }));
    }
}


/* Content editable div bug fix - change '/n' in the db to <br> when rendered */
let trackLineBreak  = (text) => {
    let new_line = /[\n\r]/g;
    return text.replace(new_line, () =>{
        return '<br>';
    });
}

/* Find links in the text and replace them with 'a' tags */
let trackLinks = (text) => {
    let new_link = /(https?:\/\/[^\s]+)/g;
    return text.replace(new_link, (url) =>{
        return `<a href=${url} target='_blank'>${url}</a>`;
    });
}

/*=========================================================================================*/

window.onload = () =>{

    /* Generate random image on page reload */
    let idName = 'image_'+Math.floor(1 + Math.random() * 10);
    container.setAttribute('id', idName);


    /*  Format location from the db*/
    if(add_location !== null){
        if(add_location.value){
            getLocation();
        }
    }

    /* Format the text from the db */
    if(inner_note_text !== null){
        inner_note_text.innerHTML = trackLineBreak(trackLinks(inner_note_text.innerHTML));
    }


    /* Request to edit name */
    new Editor(add_name, 'name').editNote();

    /* Request to edit location */
    if(add_location !== null){
        add_location.onchange = e => { 
            let inputObject = {
                value: e.target.value
            };
            let xhr = new window.XMLHttpRequest()
            xhr.open('PUT', '/notes/'+'location'+'?note='+window.location.href.slice(38), true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.onload = () => {
                if (xhr.status == 200) {     
                    add_location.value = xhr.responseText;
                    if(xhr.responseText == ''){
                        loc_symb.style.color = '';
                    } else {
                        getLocation();
                    }
                }    
            }
            xhr.send(JSON.stringify(inputObject));
        }
    }

     /* Request to edit text content */
    if(inner_note_text !== null){
        inner_note_text.onblur = e => { 

            let value = e.target.innerText; 

            let inputObject = {value};
        
            let xhr = new window.XMLHttpRequest()
            xhr.open('PUT', '/notes/'+'text'+'?note='+window.location.href.slice(38), true);
            xhr.onload = () => {
                if(xhr.status == 200){
                    inner_note_text.innerHTML = trackLineBreak(trackLinks(xhr.responseText));
                }
            }
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(inputObject));
        }
    }
    
    /* Clicking location links in the preview mode */
    for(const loc_link of loc_symb_prev){
        loc_link.onclick = () =>{
            let loc_val = loc_link.innerText.slice(1);
            window.open('https://www.google.com/maps?q='+loc_val.split(',')
            .map(param => {
                return param;
            })); 
        }
    }

    /* Request to edit note background color */
    color.forEach((color) =>{
        color.onclick = () =>{
            let color_value = {
                value: color.id
            }
            let xhr = new window.XMLHttpRequest()
            xhr.open('PUT', '/notes/color?note='+ window.location.href.slice(38), true);
            xhr.onload = function(){
                if(this.status == 200){    
                    inner_note_text.style.backgroundColor = '#'+color.id;
                    add_location.style.backgroundColor = '#'+color.id;
                    add_name.style.backgroundColor = '#'+color.id;
                    all_colors.style.backgroundColor = '#'+color.id;
                    inner_note.style.backgroundColor = '#'+color.id;
                }
            }
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.send(JSON.stringify(color_value));
        }
    });
}

