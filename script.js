var apiKey= `68ef797c869fb49c98d4912d6f16f681`;
var city='';
//form inputs
function citySearch() {
    var city= document.getElementById("city").value;
    console.log(city)
    document.getElementById("city").innerHTML=city
    
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
        
        var div= document.createElement("div")

        div.classList.add("card")

        var weatherCard=
            `<h4 class= "card-title ">${datetime.toDateString()}</h4>
            <img src= "http://openweathermap.org/img/wn/${pic}@4x.png"
                class= "card-img-top"
                alt= "description"/>
                <p id= "description">${description}</p>
                <p id= "temp">Temperature: ${temp}°</p>
                <p id= "windSpeed">WindSpeed: ${windSpeed}</p>
                <p id= "humidity">Humidity: ${humidity}%</p>`

        div.innerHTML=weatherCard
    
        forecast.appendChild(div)
        }
    }
}        
 /* var  storageItem = JSON.parse(window.localStorage.getItem("workTime"))
 console.log(storageItem)
 document.getElementById("workDay").innerText = (dayjs.extend());*/
function saveCity(city) {
    var city= document.getElementById("city").value;
    const cities= ""
    localStorage.setItem('city', JSON.stringify (cities));
    for (var i = 0; i < localStorage.length; i++)  console.log( localStorage.key(i) +" has value " + localStorage[localStorage.key(i)] )
}    

function getCity(city) {
    const cityData= JSON.parse(localStorage.getItem ('cities'));
}
localStorage.removeItem('myKey');
localStorage.clear();   

/*for(var i= 0; i < data.length; i++) {
        var date= document.createElement('p')
        date.textContent= data[i].list.dt_txt;
        forecastContainer.append(date);*/
/*.then(function displayForecast(forecastData) {    
            //var date= document.createElement("li");      
        list.dt.textContent= forecastArray[i].description;
        date.appendChild(list.dt);
        //.list[0];element = array[index];
})//city search history is saved in local storage
//future 5day forecast includes:
//date,weatherIcon,temp,windSpeed,humidity
//console.log("list")
//button/onclick city in searchHistory for current and future forecasts*/
