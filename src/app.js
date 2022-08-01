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
function search(city) {
  let apiKey = "54b81d6780000469aa10a2dbae3aa4ce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-value");
  let h1 = document.querySelector("h1");
  search(searchInput.value);
  h1.innerHTML = searchInput.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

search("Kyiv");

//Formating date
function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = temp;
  defaultTemperature = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector(".today-wind");
  currentWind.innerHTML = wind + " km/h";
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".today-humidity");
  currentHumidity.innerHTML = humidity + "%";
  let currentDescription = document.querySelector(".today-description");
  currentDescription.innerHTML = response.data.weather[0].description;
  let yourCity = document.querySelector("h1");
  yourCity.innerHTML = response.data.name;
  let currentDate = document.querySelector(".current-time");
  currentDate.innerHTML = formatDate(response.data.dt);
  let iconElement = document.querySelector(".main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Converting temperature: C to F and reverse
let defaultTemperature = null;

function convertTemp(event) {
  event.preventDefault();
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let celsiusTemp = document.querySelector(".today-temp");
  let fahrenheitTemp = Math.round((defaultTemperature * 9) / 5 + 32);
  celsiusTemp.innerHTML = fahrenheitTemp;
}

let fahrenheitTemperature = document.getElementById("fahrenheit-temperature");
fahrenheitTemperature.addEventListener("click", convertTemp);

function convertBack() {
  fahrenheitTemperature.classList.remove("active");
  celsiusTemperature.classList.add("active");
  let basicTemp = document.querySelector(".today-temp");
  basicTemp.innerHTML = defaultTemperature;
}

let celsiusTemperature = document.getElementById("celsius-temperature");
celsiusTemperature.addEventListener("click", convertBack);

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
