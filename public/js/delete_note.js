let preview_bins = document.querySelectorAll('.preview_bin');
    delete_note_modal = select('#delete_note_modal'),
    delete_inside_note_modal = select('#delete_inside_note_modal'),
    delete_note = select('.delete'),
    delete_one = select('.delete_one'),
    cancel_one = select('.cancel_one'),
    bin_inside = select('.bin_inside'),
    cancel = select('.cancel');

/* Deleting notes in the preview mode */
for(const bin of preview_bins){
    bin.onclick = (e) =>{
        delete_note_modal.style.display = 'block';
        delete_note.onclick = (e) => {
            let xhr = new XMLHttpRequest;
            xhr.open('POST', bin.href, true);
            xhr.onload = () =>{
                window.location.assign('/notes');
            }
            xhr.send();  
            e.preventDefault();
        }
        cancel.onclick = () => {
            delete_note_modal.style.display = 'none';
        }
        e.preventDefault();
    }
}

/* Deleting notes from the edit note mode */
if(bin_inside !== null){
    bin_inside.onclick = (e) =>{
        delete_inside_note_modal.style.display = 'block';
        delete_one.onclick = (e) => {
            let xhr = new XMLHttpRequest;
            xhr.open('POST', bin_inside.href, true);
            xhr.onload = () =>{
                window.location.assign('/notes');
                delete_inside_note_modal.style.display = 'none';
            }
            xhr.send();  
            e.preventDefault();
        }
        cancel_one.onclick = () => {
            delete_inside_note_modal.style.display = 'none';
        }
        e.preventDefault();
    }

}

/* Hide the delete mode if you click outside*/  
window.onclick = (e) =>{
    if(e.target == delete_note_modal){
        delete_note_modal.style.display = 'none';
    }
    if(e.target == delete_inside_note_modal){
        delete_inside_note_modal.style.display = 'none';
    }
}

