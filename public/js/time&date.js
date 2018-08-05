/* Shorten syntax */
let select = (sel) => {return document.querySelector(sel)};

let container = select('.container');
    location_modal = select('#location_modal'),
    yes = select('.yes'),
    no = select('.no'),
    allow_loc = select('#allow_loc'),
    select_country = select('#select_country'),
    default_option = select('#default_option'),
    sDisplay = select('#sDisplay'),
    hDisplay = select('#hDisplay'),
    mDisplay = select('#mDisplay'),
    format = select('.format'),
    deg = select('#deg'),
    icon = select('#icon'),
    humid = select('#hum_percent'),
    visib = select('#visibility'),
    win_m_s = select('#win_m_s');
    date_box = select('#date'),
    day = select('.day'),
    month = select('#month'),
    year = select('#year'),

    

window.onload = () => {
    /* Randomly generate background */
    let idName = 'image_'+ Math.floor(1 + Math.random() * 5);
    container.setAttribute('id', idName);


    /* Make a request to the weather api and display the weather  */
    let getWeather = (url) =>{
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
            visib.innerText = vis;
            win_m_s.innerText = weather_res.wind.speed;
        }
        xhr.send();
    }

    /* Make a request to api to get location, display the city and fire the weather function */
    let getWeatherLocation = () => {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'http://ip-api.com/json', true);
        xhr.onload = function ()  {
            if(this.status == 200){
                let data = JSON.parse(this.responseText);
                default_option.innerText = data.country+', '+data.city;
                lat_lon =  `https://fcc-weather-api.glitch.me/api/current?lat=${data.lat}&lon=${data.lon}`;
                getWeather(lat_lon);
            } 
        }
        xhr.send();
    }

    permit = localStorage.getItem('allowed');

    /* If the location is not set to allowed or blocked*/
    if(permit === null) {
        /* Dispalay the modal*/        
        location_modal.style.display = 'block';
        /* If yes set the allowed item to yes */
        yes.onclick = () => {
            localStorage.setItem('allowed', 'yes');
            /* Hide the modal */
            location_modal.style.display = "none";
            getWeatherLocation();
            
        }
        no.onclick = () => {
            localStorage.setItem('allowed', 'no');
            location_modal.style.display = "none";
            allow_loc.style.display = 'block';
        }
        
    }

    /* Detect the user's location through API */
    if(localStorage.getItem('allowed') == 'yes'){
        getWeatherLocation();
    } else {
        default_option.innerText += 'Choose location...';
        allow_loc.style.display = 'block';
    }


    /* If the allow location, send the requests  */
    allow_loc.onclick = () =>{
        localStorage.setItem('allowed', 'yes');
        allow_loc.style.display = 'none';
        getWeatherLocation();
    }


    /* A big class for time and date without a specified location and for a apecified location  */
    class timeAndDate {

        constructor(date){
            this.date = date;
        }

        getTime(){
            let only_hours = this.date.getHours();

            if(only_hours > 12){
                format.innerText = 'PM';
                let hours_to_display =  only_hours - 12;
                hDisplay.innerText = (hours_to_display < 10) ? '0' + hours_to_display : hours_to_display;       
            } else {
                hDisplay.innerText = (only_hours < 10) ? '0' + only_hours : only_hours;
                format.innerText = 'AM';
            } 

            mDisplay.innerText = (this.date.getMinutes() < 10 ) ? '0' + this.date.getMinutes() : this.date.getMinutes();
            sDisplay.innerText = (this.date.getSeconds() < 10 ) ? '0' + this.date.getSeconds() : this.date.getSeconds();
        }

        getDate(){
            /* Display the day of the week */
            let getDayOfWeek = (week_day, name) =>{
                if(this.date.getDay() == week_day){
                    day.innerText = name;
                }
            }
            
            getDayOfWeek(0, 'Sunday');
            getDayOfWeek(1, 'Monday');
            getDayOfWeek(2, 'Tuesday');
            getDayOfWeek(3, 'Wednesday');
            getDayOfWeek(4, 'Thursday');
            getDayOfWeek(5, 'Friday');
            getDayOfWeek(6, 'Saturday');

            /* Display the date */
            date_box.innerText = this.date.getDate();


            /* Display the current month  */
            let getCurrentMonth = (curr_month, name) => {
                if(this.date.getMonth() == curr_month){
                    month.innerText = name;
                }
            }

            getCurrentMonth('0', 'January');
            getCurrentMonth('1', 'February');
            getCurrentMonth('2', 'March');
            getCurrentMonth('3', 'April');
            getCurrentMonth('4', 'May');
            getCurrentMonth('5', 'June');
            getCurrentMonth('6', 'July');
            getCurrentMonth('7', 'August');
            getCurrentMonth('8', 'September');
            getCurrentMonth('9', 'October');
            getCurrentMonth('10', 'November');
            getCurrentMonth('11', 'December');

            /* Display the current year  */
            year.innerText = this.date.getFullYear();
        }
    }


    class selectCountryValue {
        constructor(field){
            this.field = field;
        }

        getZone(){
            let  getTimeInCity = (offset) => {    
                let date = new Date();
                /* Get the offsrt from utc */
                let utc_offset = date.getTimezoneOffset();
                /* Calculate the timezone offset in hours in this city, set the day to utc + count
                the offset of the city*/
                date.setMinutes(date.getMinutes() + utc_offset + offset * 60);  
                
                /* Display the current time and date using the new Time Zone date */
                let dispayTime = new timeAndDate(date);
                dispayTime.getTime();               
                dispayTime.getDate();               
            }
            if(this.field.value){
                /* If the value of the option is to the time diffence --> fire the function with the diffrence*/
                let courseofTime = (diff) =>{
                    if(this.field.value == diff){
                        getTimeInCity(diff);
                    }
                }
                /* Case for each time zone */
                courseofTime(-14);
                courseofTime(-7);
                courseofTime(-5);
                courseofTime(-4);
                courseofTime(-3);
                courseofTime(+1);
                courseofTime(+2);
                courseofTime(+3);
                courseofTime(+4);
                courseofTime(+5);
            }
        }
    }

   
     /* Every second fire the function to show the time and date */
     
    let displayDate = () => {  
        let new_date = new Date();

        /*  If the option is chosen*/
        if(select_country.value){
            let selectValue = new selectCountryValue(select_country);
            selectValue.getZone();
        /* If the option is not chosen*/
        } else{
            let dispayTime = new timeAndDate(new_date);
            dispayTime.getTime();
            dispayTime.getDate();           
        }
    }

    setInterval(displayDate, 1000);      
}