//Define Date and Time
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day}, <span class="digits">${hours}:${minutes}</span>`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//City and Temperature using API
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-value");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}`;
  let apiKey = "54b81d6780000469aa10a2dbae3aa4ce";
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertTemp() {
  let celsiusTemp = document.querySelector(".today-temp");
  let newTemp = Math.round((22 * 9) / 5 + 32);
  celsiusTemp.innerHTML = newTemp + " ";
}

let fahrenheitTemperature = document.querySelector(".fahrenheit");
fahrenheitTemperature.addEventListener("click", convertTemp);

function convertBack() {
  let basicTemp = document.querySelector(".today-temp");
  basicTemp.innerHTML = 22 + " ";
}

let celsiusTemperature = document.querySelector(".celsius");
celsiusTemperature.addEventListener("click", convertBack);

//Formating date
function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = temp + "°";
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector(".today-wind");
  currentWind.innerHTML = wind + " km/h";
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".today-humidity");
  currentHumidity.innerHTML = humidity + "%";
  //   let pressure = response.data.main.pressure;
  //   let currentPressure = document.querySelector(".today-pressure");
  //   currentPressure.innerHTML = "<strong>Pressure</strong>: " + pressure + " hPa";
  let currentDescription = document.querySelector(".today-description");
  currentDescription.innerHTML = response.data.weather[0].description;
  let yourCity = document.querySelector("h1");
  yourCity.innerHTML = response.data.name;
  let currentDate = document.querySelector(".current-time");
  currentDate.innerHTML = formatDate(response.data.dt);
}

// Button Section
function showPosition(position) {
  let yourLatitude = position.coords.latitude;
  let yourLongitude = position.coords.longitude;
  let apiKey = "54b81d6780000469aa10a2dbae3aa4ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${yourLatitude}&lon=${yourLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".share-location");
locationButton.addEventListener("click", getCurrentPosition);
