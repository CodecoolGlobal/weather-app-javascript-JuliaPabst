// Queryselectors
const root = document.querySelector("#root");
const input = document.querySelector("input");
const body = document.querySelector("body");
const datalistCities = document.getElementById("cities");
const chosenWeather = document.getElementById("chosen-weather");
const backgroundImg = document.querySelector("#backgroundImg");

// API Keys
const apiKey = "ef3f93021b5549f6866100215232103";
const searchApiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=`;
const currentApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
const pexelsApiKey = "uwcHOUHm37YDeAWCiRkUhKxaBNBKN0HvGcxtZlb1Y7h7EfGRX7PK0dbK";

let selectedCity = "Vie";

const createFormWithInput = (cityName) => {
  const option = document.createElement("option");
  option.setAttribute("value", cityName);

  return option;
};

const insertOptionElement = (cityName) => {
  const cities = document.getElementById("cities");
  cities.appendChild(createFormWithInput(cityName));
};

const createImage = (url) => {
  const img = document.createElement("img");
  img.src = url;

  chosenWeather.appendChild(img);
};

const insertWeatherData = (weatherInCelsius, weatherInFahrenheit, name) => {
  const countryName = document.createElement("h1");
  countryName.innerText = name;
  countryName.setAttribute("class", "location");
  chosenWeather.appendChild(countryName);

  const temperatureInfo = document.createElement("div");
  temperatureInfo.setAttribute("id", "temps");
  temperatureInfo.setAttribute("class", "temp");
  const lineBreak = document.createElement("hr");
  temperatureInfo.innerText = `${weatherInCelsius}° C | ${weatherInFahrenheit}° F`;

  chosenWeather.appendChild(lineBreak);
  chosenWeather.appendChild(temperatureInfo);
};

const insertAdditionalLocationData = (
  humidity,
  uv,
  windSpeed,
  windDirection
) => {
  const otherInfo = document.createElement("div");
  otherInfo.setAttribute("id", "other");
  otherInfo.setAttribute("class", "otherInfo");
  otherInfo.innerText = `Humidity: ${humidity} | UV: ${uv}| Wind: ${windSpeed}km/h (${windDirection})`;

  chosenWeather.appendChild(otherInfo);
};

fetch(searchApiUrl)
  .then((response) => response.json())
  .then((data) => {
    input.addEventListener("input", (event) => {
      let selectedCity = event.target.value;

      fetch(searchApiUrl + selectedCity)
        .then((response) => response.json())
        .then((data) => {
          datalistCities.replaceChildren();
          if (data.length > 0) {
            data.forEach((city) => {
              insertOptionElement(city.name);
            });
          }
        });
    });

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        fetch(currentApiUrl + event.target.value)
          .then((response) => response.json())
          .then((data) => {
            const cityName = data.location.name;

            // const image = "https:" + data.current.condition.icon; ==> TODO: EVTL. ERSETZEN MIT ICONS VIA DISCORD-LINK

            fetch(`https://api.pexels.com/v1/search?query=${cityName}`, {
              headers: { Authorization: pexelsApiKey },
            })
              .then((response) => response.json())
              .then((data) => {
                const cityImage = data.photos[0].src.landscape;

                body.setAttribute(
                  "style",
                  `background-image: url(${cityImage})`
                );
              });

            chosenWeather.replaceChildren();
            insertWeatherData(
              data.current.feelslike_c,
              data.current.feelslike_f,
              data.location.name
            );
            insertAdditionalLocationData(
              data.current.humidity,
              data.current.uv,
              data.current.wind_kph,
              data.current.wind_dir
            );
          });
      }
    });
  });

window.addEventListener("load", (event) => {
  input.value = "";
});
