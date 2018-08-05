/* Shorten syntax */
let selected = (sel) => { return document.querySelector(sel)};

let original_select = selected('#original_select'),
    select_country = selected('#select_country'),
    default_option = selected('#default_option'),
    box_options = selected('#box_options'),
    outside_options = selected('#outside_options'),
    search_and_options = selected('#search_and_options');
    
let options = select_country.getElementsByTagName('option');


/*If you click on the select block show all the options and the search bar */
select_country.onclick = () => {
    outside_options.style.display = 'block';
}



/*Init the function that makes a request to the weather API and displays the weather */
let weatherRequest = (url) =>{
    let xhr = new XMLHttpRequest;
    xhr.open('GET', url, true);
    xhr.onload = function () {
        let weather_res = JSON.parse(this.responseText);
        let picture = weather_res.weather[0].icon;
        let vis = weather_res.visibility / 1000;
        if(picture !== undefined){
            icon.style.backgroundImage = 'url('+picture+')'; 
        }else{
            icon.style.backgroundImage = 'url("https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F02d.png?1499366021821")'; 
        }
        deg.innerText = Math.floor(weather_res.main.temp);
        humid.innerText = weather_res.main.humidity;
        visib.innerText = Math.floor(vis);
        win_m_s.innerText = weather_res.wind.speed;
    }
    xhr.send();
}

/* For each original select option create a new div and append it to the new option box */
Array.prototype.forEach.call(original_select.options, opt =>{
    let optionDiv = document.createElement('div');
    optionDiv.innerHTML = '<p>'+ opt.innerHTML+'</p>';
    optionDiv.setAttribute('class', 'optionDiv');
    box_options.appendChild(optionDiv);
    optionDiv.onclick = () => {
        default_option.innerHTML = optionDiv.innerText;
        outside_options.style.display = 'none';
        select_country.value = opt.value;

        /* Get opt.label that contains coordinates of each city option */
        let displayWeather  = () => {  
            /* Make a request to the weather API with the coords using the weatherRequest func*/            
            let url = `https://fcc-weather-api.glitch.me/api/current?${opt.label}`;
            weatherRequest(url);
        }

        displayWeather();
    }
});

/* Hide the search bar and the options if you click outside the modal */
window.onclick = (e) =>{
    if(e.target == outside_options){
        outside_options.style.display = 'none';
    }
}
