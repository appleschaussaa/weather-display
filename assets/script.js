// var searchButton = document.getElementsByClassName("btn-primary");
var searchButton = $(".btn-primary");
// var cityButton = document.getElementsByClassName("city-button");
var cityButton = $(".city-button");
// var searchForm = document.getElementsByTagName("input")
var searchForm = $("input[name='city'] ");

var selectedCity = $("#currentCity");
var selectedTemp = $("currentTemp");
var selectedWindy = $("currentWind");
var selectedHumitity = $("currentHumitity");

var APIKey = "d00124992c277cf1269278d53664d7ad";
var city = "";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// document.querySelector("btn-primary").addEventListener("click", searchButton);
// document.querySelector("city-button").addEventListener("click", cityButton);

function currentCitySearch (event) {
    event.preventDefault ();
    var city = $("input[name='city']").val();
    if (!city) {
        console.log("enter valid city");
        return;
    }
}

// searchButton.on("click", function() {
// });

function cityWeather() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    var city = "47.6062,122.3321 ";
};

function saveToLocal(val) {
    localStorage.setItem(searchForm)
}

$(".city-btn").on("click",currentCitySearch);
$(".btn-primary").on("click",cityWeather);

// fetch(queryURL);


