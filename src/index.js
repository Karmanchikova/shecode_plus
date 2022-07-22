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
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);

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
displayForecast();

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
