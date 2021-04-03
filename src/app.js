// Upcoming Forecast
function displayForecast () {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + 
      `  
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
              <img src="http://openweathermap.org/img/wn/10d@2x.png" width="80" />
              <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">18°</span>
                  |
                  <span class="weather-forecast-temperature-min">12°</span>
              </div>
          </div>
      `;
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

// Live Date with Timezones
function formatDate(timestamp) {
  let now = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
let year = now.getFullYear();

return `${day}</br>${month} ${date}, ${year}</br></br>${hours}:${minutes}`
}

// Show typed city and temp
function showWeather(response) {
  document.querySelector(".current-city").innerHTML = `${response.data.name} `;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".current-weather").innerHTML = (
    response.data.weather[0].main
  );
  document.querySelector("#date").innerHTML = formatDate(
      response.data.dt * 1000
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
  
}

let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`
  );


// unit Conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Search city
function searchCity(city) {
  let citySearch = document.querySelector("#search-city").value;
  let apiKey = "ec14959303adc32d6b3da00379b9b626";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

// Type city
function CityFill(event) {
  event.preventDefault();
  let city = document.querySelector(".current-city");
  let cityInput = document.querySelector("#search-city");
  city.innerHTML = cityInput.value;
  searchCity(cityInput);
}

let fillIn = document.querySelector(".search-form");
fillIn.addEventListener("submit", CityFill);

// curent location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ec14959303adc32d6b3da00379b9b626";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", getCurrentLocation);


//Show Today's Date

let now = new Date();
let h4 = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
        }
let year = now.getFullYear();

h4.innerHTML = `${day}</br>${month} ${date}, ${year}</br></br>${hours}:${minutes}`;


// Unit Conversion

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let tempElement = document.querySelector(".current-temperature");
//   tempElement.innerHTML =43;
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let tempElement = document.querySelector(".current-temperature");
//   tempElement.innerHTML = 6;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);