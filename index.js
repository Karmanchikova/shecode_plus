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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

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

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = time(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
