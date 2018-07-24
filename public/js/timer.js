let select = (sel) => {return document.querySelector(sel)};
let listen = (el, e, func) => { el.addEventListener(e, func)};

let container = select('.container'),
    startBtn = select('#startBtn'),
    resetBtn = select('#resetBtn'),
    pauseBtn = select('#pauseBtn'),
    hours = select('#hours'),
    mins = select('#mins'),
    secs = select('#secs'),
    timer_form = select('#timer_form'),
    time = select('.time');

listen(startBtn, 'click', startTimer);    
listen(pauseBtn, 'click', pauseTimer);    
listen(resetBtn, 'click', resetTimer);   


/* Generate background on page reload */
window.onload = () =>{
    let idName = 'image_'+Math.floor(1 + Math.random() * 9);
    container.setAttribute('id', idName);
}

function startTimer(e){

        if(hours.value.length !== 0 || mins.value.length !== 0 || secs.value.length !== 0){
            startBtn.style.display = "none";
            pauseBtn.style.display = 'block';
            setTimeout(showReset, 500);

            function showReset () {     
                resetBtn.style.display = 'block';
            }

            getTimerValues();
            

            let s = parseInt(secs.value);
            let m = parseInt(mins.value);
            let h = parseInt(hours.value);

            if(secs.value.length == 0){
                s = 0;
            }
        
            if(mins.value.length == 0){
                m = 0;
            }
            
            if(hours.value.length == 0){
                h = 0;
            }

            let counter = 0;
            

            function getTimerValues() {

                function convertSecs (s) {
                    let hour = Math.floor(s/3600);
                    let min = Math.floor((s % 3600)/60);
                    let sec = s % 60;

                    secs.value = sec;
                    mins.value = min;
                    hours.value = hour;

                    if(hour < 10){
                        hours.value = '0' + hour;
                    }
                    if(min < 10){
                        mins.value = '0' + min;
                    }
                    if(sec < 10){  
                        secs.value = '0' + sec;
                    }
                }

                let interval = setInterval(timer, 1000);

                function timer() {
                    counter++;
                    
                    let wholevalue = s + m * 60 + h * 3600; 
                    
                    let result = convertSecs(wholevalue - counter);
      
                    if(wholevalue === counter){
                        let audio = new Audio('../sounds/laugh.mp3');
                        audio.play();
                        clearInterval(interval, 0);
                        pauseBtn.style.display = 'none';
                        startBtn.style.display = "block";
                        resetBtn.style.display = 'none';
                    }

                    listen(resetBtn, 'click', stopTimer);
                    listen(pauseBtn, 'click', pause);       
                    function stopTimer(){
                    clearInterval(interval, 0);
                    }

                    function pause(){
                        clearInterval(interval, 0);
                    }
                }
            }

        } else {
            console.log('Please fill in one of the fields');
            pauseBtn.style.display = 'none';
            startBtn.style.display = "block";
        }



        e.preventDefault();
    }


function pauseTimer(e){
    pauseBtn.style.display = 'none';
    startBtn.style.display = "block";
    e.preventDefault();
}

function resetTimer(e){
    resetBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    startBtn.style.display = "block";
    timer_form.reset();
    e.preventDefault();
}


