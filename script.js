var apiKey= `68ef797c869fb49c98d4912d6f16f681`;
var city='';

//form inputs
function citySearch() {
    var city= document.getElementById("city").value;
    document.getElementById("city").innerHTML=city

    
    const cityArray = []; 
 
    for (let i = 0; i < Array.length; i++) { 
  // Get user input 
  var city= document.getElementById("city").value; 
 
  // Add the input to the array 
  cityArray.push(document.getElementById("city").value); 

} 
 const cityArrayFromLocalStorage = localStorage.getItem('cityArray')
    if (cityArrayFromLocalStorage && cityArrayFromLocalStorage.length) {
    const cityArray = JSON.parse(cityArrayFromLocalStorage)
    }
console.log(cityArray);
    localStorage.setItem('cityArray', JSON.stringify (cityArray));
    for (var i = 0; i < localStorage.length; i++)  console.log( localStorage.key(i) +" has value " + localStorage[localStorage.key(i)] )
    console.log(city)
   
    

    //querycity search to obtain cordinates
    var firstCall= `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(firstCall) 
        .then((response)=> response.text())
        .then(mapData=> setCoordinates(mapData))
}
document.getElementById("searchBtn").addEventListener("click", citySearch);

//plug in city coordinates to make 2nd API call
function setCoordinates(mapData) {
    var coordinates= JSON.parse(mapData);
    var lat= coordinates[0].lat;
    var lon= coordinates[0].lon;
    var secondCall=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    //lat & lon data= coordinates
    fetch(secondCall)
        .then(function(response){
        return response.json()
        })
        .then(forecastData=> weatherData(forecastData))
       // .then(forecastData=> saveCity(forecastData))
        .then(console.log(coordinates))  
}
 
//display 5 day forecast
 function weatherData(forecastData){
   console.log(forecastData)  

    var forecast= document.getElementById("forecast")

    for (let i = 0; i < forecastData.list.length; i++) {
        const listElement = forecastData.list[i];
        
        if (listElement.dt_txt.includes("12:00:00")) {console.log(listElement)    
        var datetime= new Date(listElement.dt*1000)
        var date= listElement.dt_txt;
        var pic= listElement.weather[0].icon;
        var description= listElement.weather[0].description  
        var temp= listElement.main.temp;
        var humidity= listElement.main.humidity;
        var windSpeed= listElement.wind.speed;
        var cityName= forecastData.city.name
        var div= document.createElement("div")

        div.classList.add("card")

        var weatherCard=
            `<h4 class= "card-title ">${datetime.toDateString()}</h4>
            <img src= "http://openweathermap.org/img/wn/${pic}@4x.png"
                class= "card-img-top"
                alt= "description"/>
                <p id= "description">${description}</p>
                <p id= "temp">Temperature: ${temp}°F</p>
                <p id= "windSpeed">WindSpeed: ${windSpeed}mph</p>
                <p id= "humidity">Humidity: ${humidity}%</p>`

        div.innerHTML=weatherCard
    
        forecast.appendChild(div)
        }
    }
}        
 /* var  storageItem = JSON.parse(window.localStorage.getItem("workTime"))
 console.log(storageItem)
 document.getElementById("workDay").innerText = (dayjs.extend());*/
/*function saveCity(forecastData) {
    console.log(forecastData)
    var city= document.getElementById("city").value;
    const cities= ""
    localStorage.setItem('city', JSON.stringify (cities));
    for (var i = 0; i < localStorage.length; i++)  console.log( localStorage.key(i) +" has value " + localStorage[localStorage.key(i)] )
}    
*/
