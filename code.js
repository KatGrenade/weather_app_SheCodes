let currentTime = new Date();
function displayTime() {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[currentTime.getDay()];
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let displayCurrentTime = `${day}, ${hour}:${minutes}`;
  return displayCurrentTime;
}
let showTime = document.querySelector(`#date`);
showTime.innerHTML = displayTime(currentTime);

function displayWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function displayCityInput(event) {
  event.preventDefault();
  //let cityNameInput = document.querySelector(`#city-input`);
  //let cityName = document.querySelector(`.city-name`);
  //cityName.innerHTML = `${cityNameInput.value}`;
  let apiKey = "0f380eeef06d6360d28eb090a2663364";
  let citySearchResult = document.querySelector(`#city-input`).value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchResult}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let citySearchForm = document.querySelector(`#city-search-form`);
citySearchForm.addEventListener(`submit`, displayCityInput);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function locationWeather(response) {
  console.log(response);
  let h1 = document.querySelector(`.city-name`);
  h1.innerHTML = `${response.data.name}`;
  let locationTemperature = document.querySelector(`#temperature`);
  let newTemperature = Math.round(response.data.main.temp);
  locationTemperature.innerHTML = `${newTemperature}`;
}
function coordinates(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "0f380eeef06d6360d28eb090a2663364";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(locationWeather);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(coordinates);
}
let myLocationButton = document.querySelector(`#my-location`);
myLocationButton.addEventListener(`click`, getCurrentLocation);