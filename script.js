var apiKey= `68ef797c869fb49c98d4912d6f16f681`;
var city='';

//form inputs
function citySearch() {
    var city= document.getElementById("city").value;
    document.getElementById("city").innerHTML=city
    console.log(city)
    
//querycity search

   var firstCall= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
   fetch(firstCall) 
  .then((response) =>response.text())
  .then(data=> setCoordinates(data))
  }
document.getElementById("searchBtn").addEventListener("click", citySearch);

//display current and future weather conditions
//&
//city search history is saved in local storage
function setCoordinates(mapData) {
    var coordinates= JSON.parse(mapData);
    var lat= coordinates[0].lat;
    var lon= coordinates[0].lon;
    var secondCall=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//lat & lon data= coordinates
    fetch(secondCall)
    .then((response)=> response.text())
    .then(data=> setWeatherData(data))
    .then(console.log(coordinates))

    document.getElementById("callOne").innerHTML= mapData;
}
setCoordinates(mapData)
//weather conditions include:
//cityName,date,weatherIcon,temp,humidity,windSpeed
function setWeatherData(forecastData){
    var weatherData= JSON.parse(forecastData)
   // var cityResult= city.normalize;
    //var date= list.dt_txt;
    
document.getElementById("callTwo").innerHTML = forecastData
.then(console.log(forecastData))    
}
setWeatherData(forecastData)

//future 5day forecast includes:
//date,weatherIcon,temp,windSpeed,humidity
//console.log("list")
//button/onclick city in searchHistory for current and future forecasts
