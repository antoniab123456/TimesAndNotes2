let star_note = document.querySelectorAll('.star2');
    star_checked = document.querySelectorAll('.star_checked'),
    star_empty = document.querySelectorAll('.star_empty'),
    star_filled = document.querySelectorAll('.star_filled'),
    preview_note_mode_starred = select('#preview_note_mode_starred'),
    starred_header = select('#starred_header'),
    preview_note_mode = select('#preview_note_mode');

/*  Hide the Starred section if it's empty*/
if(star_filled !== null){
    if(star_filled.length < 1) {
        if( preview_note_mode_starred !== null){
            preview_note_mode_starred.style.display = 'none';
            preview_note_mode.style.marginTop = "10%";
            preview_note_mode.style.height = "600px";
        }
    }
}

/* Handle Pinning and Unpinning notes */
class Pinning{
    constructor (init_div, div_changed){
        this.init_div = init_div;
        this.div_changed = div_changed;
    }
    handlePinning () {
        Array.prototype.forEach.call(this.init_div, (star) => {
            star.onclick = (e) =>{
                let xhr = new XMLHttpRequest;
                xhr.open('POST', star.href, true);
                xhr.onload = () => {
                    if(xhr.status == 200){
                        /* Styles */
                        star.style.display = "none";
                        for(const star_ch of this.div_changed){
                            if(star.href == star_ch.href){
                                star_ch.style.display = 'block';
                            }
                        }
                        /* Functionality */
                        window.location.assign('/notes');
                    }
                }
                xhr.send();
                e.preventDefault();
            }
        });
    }
    handleUnpinning () {
        Array.prototype.forEach.call(this.div_changed, (star_ch) => {
            star_ch.onclick = (e) =>{
                let xhr = new XMLHttpRequest;
                xhr.open('POST', '/notes/unpin?note='+star_ch.href.slice(37), true);
                xhr.onload = () => {
                    if(xhr.status == 200){
                        /* Styles */
                        star_ch.style.display = 'none';
                        for(const star of this.init_div){
                            if(star_ch.href == star.href){
                                star.style.display = 'block';
                            }
                        }
                    }

                    /* Functionality */
                    window.location.assign('/notes');
                }
                xhr.send();
                e.preventDefault();
            }
        });
    }
}

let pin1 = new Pinning(star_note, star_checked);
let pin2 = new Pinning(star_empty, star_filled);
pin1.handlePinning();
pin1.handleUnpinning();
pin2.handlePinning();
pin2.handleUnpinning();

