var apiKey= `68ef797c869fb49c98d4912d6f16f681`;
var city='';
//var cityName= data.city.name;
   
/*var date= document.getElementById('date');
var icon= document.getElementById('icon');
var temp= document.getElementById('temp');
var windSpeed= document.getElementById('windSpeed');
var humidity=document.getElementById('humidity');*/
//form inputs
function citySearch() {
    var city= document.getElementById("city").value;
    document.getElementById("city").innerHTML=city
    console.log(city)
//querycity search to obtain cordinates
    var firstCall= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(firstCall) 
        .then((response)=> response.text())
        .then(data=> setCoordinates(data))
  }
document.getElementById("searchBtn").addEventListener("click", citySearch);
//plug in city coordinates to make 2nd API call
function setCoordinates(data) {
    var coordinates= JSON.parse(data);
    var lat= coordinates[0].lat;
    var lon= coordinates[0].lon;
    var secondCall=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//lat & lon data= coordinates
    fetch(secondCall)
        .then(function(response){
        return response.json()
        })
        .then(data=> setWeatherData(data))
        .then(console.log(coordinates)) 
       
}
 /* var cityHeading=
     `<h2> ${city}</h2>`
     var div= document.createElement("div")
     div.classList.add("city")
     div.innerHTML=city
console.log(city)*/

function setWeatherData(data){
   console.log(data) 

   
    var forecast= document.getElementById("forecast")
        
    for (let i = 0; i < data.list.length; i++) {
        const listElement = data.list[i];
        
        if (listElement.dt_txt.includes("15:00:00")) {
         console.log(listElement)    
       
        var date= listElement.dt_txt;
        var pic= listElement.weather.icon;

        var temp= listElement.main.temp;
        var humidity= listElement.main.humidity;
        var windSpeed= listElement.wind.speed;
        
        var div= document.createElement("div")

        div.classList.add("container")

        var weatherCard=
            `<ul>
                <p id="date">Weather Forecast for: ${date}</p>
                <img id="pic"/>
                <p
                <p id="temp">Temperature: ${temp}</p>
                <p id="humidity">Humidity: ${humidity}</p>
                <p id="windSpeed">WindSpeed: ${windSpeed}</p>
                
            </ul>`
        div.innerHTML=weatherCard
    
        forecast.appendChild(div)
        }
    }
   
     
}    
    /*date.innerHTML= dateValue;
    pic.innerHTML= picValue;
    temp.innerHTML= tempValue;
    windSpeed.innerHTML= windSpeedValue;
    humidity.innerHTML= humidityValue;*/
    
    /*for(var i= 0; i < data.length; i++) {
        var date= document.createElement('p')
        date.textContent= data[i].list.dt_txt;
        forecastContainer.append(date);*/

   

//display current and future weather conditions
//weather conditions include:cityName,date,weatherIcon,temp,humidity,windSpeed


/*.then(function displayForecast(forecastData) {
    
    
            //var date= document.createElement("li");
        
       
        list.dt.textContent= forecastArray[i].description;
        date.appendChild(list.dt);       //.list[0];element = array[index];
    }
     console.log(date)
    var = ;
    var pic= list.weather.icon;
    var temp= list.main.temp;
    var windSpeed= list.wind.speed;
    var humidity= list.main.humidity
    var forecast= document.getElementById("forecast");
})//city search history is saved in local storage
//future 5day forecast includes:
//date,weatherIcon,temp,windSpeed,humidity
//console.log("list")
//button/onclick city in searchHistory for current and future forecasts*/
