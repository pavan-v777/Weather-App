const inputBox = document.querySelector('.input-box');
const searchBox = document.querySelector('.search-box')
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const city = document.querySelector('.city');
const date_time = document.querySelector('.date_time');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


    let units = "metric";
    const api_key = "6872e8a4656a8ac19a9d38b63c05e622";
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

    function convertTimeStamp(timestamp,timezone){
        const convertTimezone = timezone/3600;//convert seconds to hours
        const date = new Date(timestamp*1000);
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: `GMT${convertTimezone >= 0 ? "-": "+"}${Math.abs(convertTimezone)}`,
            hour12: true,

        }
        return date.toLocaleString(options)

    }

    async function checkWeather(city){

    const response = await fetch(url + city + `&appid=${api_key}`);

    var weather_data = await response.json();



    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
     date_time.innerHTML = convertTimeStamp(weather_data.dt,weather_data.timezone);
    document.querySelector(".city").innerHTML = weather_data.name;
    document.querySelector(".temperature").innerHTML = Math.round(weather_data.main.temp) + "°C";
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    visibility.innerHTML = `${weather_data.visibility}`;
    pressure.innerHTML =`${weather_data.main.pressure}hPa`;
    
    document.querySelector(".description").innerHTML = weather_data.weather[0].description;

    //city.innerHTML =  `${weather_data.name}`;
    //temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;

    //humidity.innerHTML = `${weather_data.main.humidity}%`;
    //wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;




    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assests/clouds1.png";
            break;
        case 'Clear':
            weather_img.src = "assests/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assests/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assests/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assests/snow.png";
            break;
        case 'thunder':
            weather_img.src = "assests/thunderstorm.jpg";
            break;
    

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});