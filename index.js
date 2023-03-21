const rootElement = document.querySelector("#root");
function setupInputCityValue() {
  let inputCityValue = "Vienna";
  insertWeatherInformation();
  insertForm();

  let inputCityFormElement = document.querySelector("#inputCityForm");
  inputCityFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputCityElement = document.querySelector("#inputCity");
    inputCityValue = inputCityElement.value;

    const cityNames = cities.map((city) => city.name);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&appid=56597bbf24331d29314f4d0f9c28a95c`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        changeWeatherData(data);
      });
  });
}

function insertForm(data) {
  rootElement.insertAdjacentHTML(
    "afterbegin",
    `<form id="inputCityForm" autocomplete="on" method="get">
  <input id="inputCity" type="text" placeholder="Enter a city">
  <input type="submit" value="Submit">
  </form>`
  );
}

function insertWeatherInformation() {
  let starterUrl = `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=56597bbf24331d29314f4d0f9c28a95c`;
  fetch(starterUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const rootElement = document.querySelector("#root");
      const temperatureFahrenheit = data.main.temp;
      const temperatureCelsius =
        Math.round((temperatureFahrenheit - 273.15) * 10) / 10;
      const skyConditions = data.weather[0].description;
      const humidity = data.main.humidity;

      rootElement.insertAdjacentHTML(
        "beforeend",
        `<div id="weatherData"></div>`
      );
      const weatherDataElement = document.querySelector("#weatherData");

      weatherDataElement.insertAdjacentHTML(
        "beforeend",
        `<h1 id="cityName">${data.name}</h1>`
      );
      weatherDataElement.insertAdjacentHTML(
        "beforeend",
        `<div id="temperature">${temperatureCelsius}°C</div>`
      );
      weatherDataElement.insertAdjacentHTML(
        "beforeend",
        `<div id="skyConditions">${skyConditions}</div>`
      );
      weatherDataElement.insertAdjacentHTML(
        "beforeend",
        `<div id="humidity">${humidity}%</div>`
      );
    });
}

function changeWeatherData(data) {
  const temperatureFahrenheit = data.main.temp;
  const temperatureCelsius =
    Math.round((temperatureFahrenheit - 273.15) * 10) / 10;
  let cityNameElement = document.querySelector("#cityName");
  let temperatureElement = document.querySelector("#temperature");
  let skyConditionsElement = document.querySelector("#skyConditions");
  let humidityElement = document.querySelector("#humidity");
  cityNameElement.innerText = `${data.name}`;
  temperatureElement.innerText = `${temperatureCelsius}°C`;
  skyConditionsElement.innerText = `${data.weather[0].description}`;
  humidityElement.innerText = `${data.main.humidity}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  setupInputCityValue();
});
