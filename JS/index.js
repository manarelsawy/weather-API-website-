// * TODAY Variables
let todayName = document.getElementById('todaydata-dayname');
let todayNumber = document.getElementById('todaydata-daynumber');
let todayMonth = document.getElementById('todaydata-month');
let todayLocation = document.getElementById('today-location');
let todayTemp = document.getElementById('todaytemp');
let todayConditionImg = document.getElementById('today-condition-img');
let todayConditionText = document.getElementById('today-condition-text');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirectiont = document.getElementById('wind-direction');
let todatName = document.getElementById('todaydata-dayname');
let WeatherData

// * NEXT Day

let nextDay = document.getElementsByClassName('next-day-name');
let nextMaxTemp = document.getElementsByClassName('next-max-temp');
let nextMinTemp = document.getElementsByClassName('next-main-temp');
let nextConditionImg = document.getElementsByClassName('next-condition-img');
let nextConditionText = document.getElementsByClassName('next-condition-text');

// * Search Input

let searchInput = document.getElementById('search');

// & API Data

async function getWeatherData(city){
    let weatherRespons = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=084e0df25aab4732a21223352241410&q=07112${city}&days=3`)
    let weatherData = await weatherRespons.json();
    return weatherData;
}

getWeatherData()

// - TODAY Data
function displayTodayData(data){
    let todayDate = new Date()
    todatName.innerHTML = todayDate.toLocaleDateString("en-us", {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity +"%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirectiont.innerHTML = data.current.wind_dir
}

// - NEXT Day

async function displayNextDay(data){
    let forecastData = await data.forecast.forecastday
    for(i=0 ; i<2 ;i++ ){
        let Ndate = new Date(forecastData[i+1].date) 
        nextDay[i].innerHTML =  Ndate.toLocaleDateString("en-us",{weekday:"long"})
        nextMaxTemp[i].innerHTML =  forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML =  forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src".forecastData[i+1].day.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.text
    }
    
}

// : Main FUNCTION
async function displayALL(city) {
    let weatherData = await getWeatherData(city);
    
    if(!weatherData.error){
        displayTodayData(weatherData);
        displayNextDay(weatherData);
        


    }
}
displayALL()


searchInput.addEventListener("input" , function(){
    displayALL(searchInput.value);
    // console.log(searchInput.value)
})




// replace CITY_NAME and API_KEY with your own values

// async function getWeather() {
//     let apiURL = await fetch (`https://api.ip2location.io/?key=452C5857021213C2276CF35D90345AAF&ip=${city_name}8.8.8.8&format=json`);
//   let weatherdata = await apiURL.json();
//   let cityName = weatherdata.name;
// //   const temperature = weatherData.main.temp;
//   document.getElementById("today-location").innerText = cityName;
// }
// getWeather()


// navigator.geolocation
// navigator.geolocation.getCurrentPosition(console.log , console.error)
