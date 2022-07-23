function time() {
  let now = new Date();
  let hour = document.querySelector("#time");
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  hour.innerHTML = `${
    week[now.getDay()]
  } ${now.getHours()}:${now.getUTCMinutes()} `;
}
time();
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
formatDay();
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col WeatherForecastPreview">
              <div class="DayOfAWeek">${formatDay(forecastDay.dt)}</div>
              <img src = "http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt = "Weather Icon"
              width = "42"
              />
              <div class="temperature-max">${Math.round(
                forecastDay.temp.max
              )}ºC</div>
              <div class="temperature-min">${Math.round(
                forecastDay.temp.min
              )}ºC</div>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getWeatherForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a28cec4bab57c9cd0fb85c6d20697f64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + " %;";
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#realFeel").innerHTML =
    "Feels like " + Math.round(response.data.main.feels_like) + "  °C";

  document.querySelector("#mini").innerHTML =
    "Min. temp " + Math.round(response.data.main.temp_min) + "  °C";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
showForecast();

function searchCity(city) {
  let apiKey = "a28cec4bab57c9cd0fb85c6d20697f64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  searchCity(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `75.2 °F`;
}
//Bonus
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `24 °C`;
}
let fahrenheitClick = document.querySelector("#far");
fahrenheitClick.addEventListener("click", convertToFahrenheit);

let celsiusClick = document.querySelector("#cel");
celsiusClick.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
