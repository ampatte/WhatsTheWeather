var apiKey = `68ef797c869fb49c98d4912d6f16f681`;
var city = ""
//use this to pull the current date
var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

console.log(dateTime);

function showCities() {
  const cityArrayFromLocalStorage = localStorage.getItem("cityArray");
  const cityArray = JSON.parse(cityArrayFromLocalStorage) || [];

  for (let index = 0; index <cityArray.length; index++) {
    const city = cityArray[index];
    console.log("city", city)
  }
}
showCities()

//form inputs
function citySearch() {
  var city = document.getElementById("city").value;
  document.getElementById("city").innerHTML = city;
  document.getElementById("city").setAttribute("hidden", "hidden")

  const cityArrayFromLocalStorage = localStorage.getItem("cityArray");
  const cityArray = JSON.parse(cityArrayFromLocalStorage) || [];

  for (let i = 0; i < Array.length; i++) {
    // Get user input
    var city = document.getElementById("city").value;
    // Add the input to the array
    cityArray.push(document.getElementById("city").value);
  }

  localStorage.setItem("cityArray", JSON.stringify(cityArray));
  
  //querycity search to obtain cordinates
  var firstCall = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  fetch(firstCall)
    .then((response) => response.text())
    .then((mapData) => setCoordinates(mapData));

  var secondCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(secondCall)
    .then((response) => response.json())
    .then((currentData) => currentWeather(currentData));
}
document.getElementById("searchBtn").addEventListener("click", citySearch);

//plug in city coordinates to make 3rd API call
function setCoordinates(mapData) {
  var coordinates = JSON.parse(mapData);
  var lat = coordinates[0].lat;
  var lon = coordinates[0].lon;
  var thirdCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  //lat & lon data= coordinates
  fetch(thirdCall)
    .then((response) => response.json())
    .then((forecastData) => weatherData(forecastData))
    .then(console.log(coordinates));
}

//display the current weather
function currentWeather(currentData) {
  console.log(currentData);
  var weatherNow = document.getElementById("weatherNow");
  weatherNow.innerHTML = ""
 
  var cityName = currentData.name;
  var datetime = new Date();
  var pic = currentData.weather[0].icon;
  var description = currentData.weather[0].description;
  var temp = currentData.main.temp;
  var humidity = currentData.main.humidity;
  var windSpeed = currentData.wind.speed;
  var div = document.createElement("div");
  div.classList.add("container");

  var currentCard = `<div class="container my-5">
  <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
    <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
      <h4 class= "card-title ">${datetime.toDateString()}</h4>
      <h1 class="display-4 fw-bold lh-1">${cityName}</h1>
      <img src= "http://openweathermap.org/img/wn/${pic}@4x.png"
      class= "card-img-top"
      alt= "description"/>
      <p id= "description">${description}</p>
      <p class="lead">Temperature: ${temp}°F</p>
      <p class="lead">WindSpeed: ${windSpeed}</p>
      <p class="lead">Humidity: ${humidity}%</p>
    </div>
  </div>`

  div.innerHTML = currentCard;

  weatherNow.appendChild(div);

  console.log(currentData);
}

//display 5 day forecast
function weatherData(forecastData) {
  var forecast = document.getElementById("forecast");
  forecast.innerHTML = ""
  for (let i = 0; i < forecastData.list.length; i++) {
    const listElement = forecastData.list[i];
    
    if (listElement.dt_txt.includes("15:00:00")) {
      console.log(listElement);
      var datetime = new Date(listElement.dt * 1000);
      var pic = listElement.weather[0].icon;
      var description = listElement.weather[0].description;
      var temp = listElement.main.temp;
      var humidity = listElement.main.humidity;
      var windSpeed = listElement.wind.speed;

      var div = document.createElement("div");

      div.classList.add("card");

      var weatherCard = `<h4 class= "card-title ">${datetime.toDateString()}</h4>
            <img src= "http://openweathermap.org/img/wn/${pic}@4x.png"
                class= "card-img-top"
                alt= "description"/>
                <p id= "description">${description}</p>
                <p id= "temp">Temperature: ${temp}°F</p>
                <p id= "windSpeed">WindSpeed: ${windSpeed}mph</p>
                <p id= "humidity">Humidity: ${humidity}%</p>`;

      div.innerHTML = weatherCard;

      forecast.appendChild(div);
    }
  }
}