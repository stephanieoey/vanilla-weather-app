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
}

let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`
  );

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

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".current-temperature");
  tempElement.innerHTML =43;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".current-temperature");
  tempElement.innerHTML = 6;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);