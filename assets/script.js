var searchButton = $(".btn-primary");
var cityButton = $(".city-button");
var searchForm = $("input[name='city'] ");

var selectedCity = $("#currentCity");
var selectedTemp = $("#currentTemp");
var selectedWindy = $("#currentWind");
var selectedHumidity = $("#currentHumidity");
var forecastContainer = $(".forcast-five");

var APIKey = "d00124992c277cf1269278d53664d7ad";

// Event listener for city search form
cityButton.on("click", function(event) {
  event.preventDefault();
  currentCitySearch();
});

// Event listener for search button
searchButton.on("click", function() {
  cityWeather();
});

// Function to handle current city search
function currentCitySearch (event) {
    event.preventDefault ();
    var city = searchForm.val();
    if (!city) {
        console.log("enter valid city");
        return;
    }
}

// Function to fetch weather data from API for city search
function cityWeather() {
    var city = searchForm.val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    // fetching the API for current weather
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
             // Update selectedCity, selectedTemp, selectedWindy, and selectedHumidity with data from API
             // temperature has to be converted from Kelvin to Fahrenheit so created a bariable to do that
             var temperatureInF = (data.main.temp - 273.15) * 9/5 + 32;
             selectedCity.text(data.name);
             selectedTemp.text("Temp: " + temperatureInF.toFixed(2) + " °F"); 
             selectedWindy.text("Wind Speed: " + data.wind.speed + " mph");
             selectedHumidity.text("Humidity: " + data.main.humidity + "%");
             // Fetch 5-day forecast data
             fiveDayWeather(city);
         })
         .catch(function (error) {
             console.error(error);
         });
 };

// Function to fetch 5-day forecast data from API
function fiveDayWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

  // fetching the API for the extended forecast
  fetch(queryURL)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data);
          var forecastData = data.list;
          var forecastDate = moment();

          // Clear existing forecast data
          forecastContainer.empty();

          // Loop through the forecastData to populate the DOM
          for (var i = 0; i < forecastData.length; i += 8) {
              // since the forecastContainer has been cleared this will introduce new data and the HTML to hold it
              var forecast = forecastData[i];
              var temperatureInF = (forecast.main.temp - 273.15) * 9/5 + 32;
              var forecastDate = moment(forecast.dt * 1000).format("ddd MMM DD");
              var forecastCard = $("<div>").addClass("col");
              var cardBody = $("<div>").addClass("each-card");
              var cardBodyInner = $("<div>").addClass("card-body");
              var cardDate = $("<h5>").addClass("card-title").text(forecastDate);
              var cardIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png");
              var cardTemp = $("<p>").addClass("card-text").text("Temp: " + temperatureInF.toFixed(2) + " °F");
              var cardWind = $("<p>").addClass("card-text").text("Wind: " + forecast.wind.speed + " mph");
              var cardHumidity = $("<p>").addClass("card-text").text("Humidity: " + forecast.main.humidity + "%");

              // Append forecast data to forecast card
              cardBodyInner.append(cardDate, cardIcon, cardTemp, cardWind, cardHumidity);
              cardBody.append(cardBodyInner);
              forecastCard.append(cardBody);
              forecastContainer.append(forecastCard);
          }
      })
      .catch(function (error) {
          console.error(error);
      });
};


