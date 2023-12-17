const apiKey = '2d5f6dc535843760f4ad706617f944e4'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=matric'

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector(".loader");

const weatherToImageMap = {
    "Clouds": "images/cloud.png",
    "Clear": "images/clear-sky.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/haze.png",
    "Mist": "images/snow.png"
};



async function checkWeather(cityName){
    loader.style.display = "block"; 
    const response = await fetch(apiUrl + `&APPID=${apiKey}` +`&q=${cityName}`);
    const data = await response.json();    
    console.log("data", data)
    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
    }
    else{

        document.querySelector(".city").innerHTML = `${data.name} (${data.sys.country})`;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp - 273.15)} °C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
        const weatherMain = data.weather[0]
        weatherIcon.src = weatherToImageMap[weatherMain] || "images/cloud.png";


        document.querySelector(".weather").style.display = "block"
    }
    loader.style.display = "none"; 
}

searchButton.addEventListener("click", ()=>{    
    checkWeather(searchBox.value);
})

// checkWeather()