
const root = document.querySelector("#root");


const createFormWithInput = () => {
    const form = document.createElement("form");
    form.setAttribute("autocomplete", "on");
    form.setAttribute("method", "get");

    const input = document.createElement("input");
    input.setAttribute("placeholder", "Country Name");
    form.appendChild(input);

    return form;
};

const insertFormWithInputElement = () => {
    root.appendChild(createFormWithInput());
};

insertFormWithInputElement();

const input = document.querySelector("input");
console.log(input);
input.addEventListener("submit", event => {
    event.preventDefault();
});

const cityNames = cities.map(city => city.name);
console.log(cityNames);

fetch("https://api.weatherapi.com/v1/current.json?key=ef3f93021b5549f6866100215232103&q=global")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const url = data.url;
        const weather = data;
    });

// // replace YOUR_API_KEY with your Weather API key
// const API_KEY = "ef3f93021b5549f6866100215232103";

// // construct the API URL for city search
// const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=*&format=JSON`;
import { loadJsonData } from "./dataLoader.js";

function main() {
  loadJsonData("city.list.json")
    .then((data) => {
      insertForm(data);
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
}

function setupInputCityValue() {
  const rootElement = document.querySelector("#root");
  let inputCityValue = "Vienna";
  insertWeatherInformation();

  let inputCityFormElement = document.querySelector("#inputCityForm");

  inputCityFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputCityElement = document.querySelector("#inputCity");
    inputCityValue = inputCityElement.value;

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
  let inputCityValue = "Vienna";
  const rootElement = document.querySelector("#root");
  rootElement.insertAdjacentHTML(
    "afterbegin",
    `<form id="inputCityForm">
    <input id="inputCity" type="text" placeholder="Enter a city" list="city-datalist">
    <input type="submit" value="Submit">
    </form>
    <datalist id="city-datalist"></datalist>`
  );
  const inputCityFormElement = document.querySelector("#city-datalist");
  data.forEach((city) => {
    inputCityFormElement.insertAdjacentHTML(
      "beforeend",
      `<option value="${city.name}"></option>`
    );
  });
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

document.addEventListener("DOMContentLoaded", async () => {
  await main();
  setupInputCityValue();
});

// // fetch the list of cities
// fetch(API_URL)
//   .then(response => response.json())
//   .then(data => {
//     // do something with the list of cities
//     console.log(data);
//   })
//   .catch(error => {
//     // handle errors
//     console.error(error);
//   });