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
const authorization = { headers: { Authorization: pexelsApiKey }};

let selectedCity;

const changeBackgroundImageTo = (image) => {
    body.setAttribute("style", `background-image: url(${image})`);
};

const deleteWeatherData = () => {
    chosenWeather.replaceChildren();
};

const deleteOptionElements = () => {
    datalistCities.replaceChildren();
};

const clearInputField = () => {
    input.value = "";
};

const createFormWithInput = (cityName) => {
    const option = document.createElement("option");
    option.setAttribute("value", cityName);

    return option;
};

const insertOptionElements = (cityName) => {
    const cities = document.getElementById("cities");
    cities.appendChild(createFormWithInput(cityName));
};

const insertWeatherData = (weatherInCelsius, weatherInFahrenheit, name) => {
    const countryName = document.createElement("h1");
    countryName.innerText = name;
    countryName.setAttribute("class", "location");
    chosenWeather.appendChild(countryName);

    const temperatureInfo = document.createElement("div");
    temperatureInfo.setAttribute("id", "temps");
    temperatureInfo.setAttribute("class", "temp");
    temperatureInfo.innerText = `${weatherInCelsius}° C | ${weatherInFahrenheit}° F`;
    chosenWeather.appendChild(temperatureInfo);
    
    const lineBreak = document.createElement("hr");
    chosenWeather.appendChild(lineBreak);
};

const insertAdditionalLocationData = (humidity, uv, windSpeed, windDirection) => {
    const otherInfo = document.createElement("div");
    otherInfo.setAttribute("id", "other");
    otherInfo.setAttribute("class", "otherInfo");
    otherInfo.innerText = `Humidity: ${humidity} | UV: ${uv}| Wind: ${windSpeed}km/h (${windDirection})`;

    chosenWeather.appendChild(otherInfo);
};

fetch(searchApiUrl)
    .then(response => response.json())
    .then(data => {
        input.addEventListener("input", event => {

        let selectedCity = event.target.value;

        fetch(searchApiUrl + selectedCity)
            .then(response => response.json())
            .then(data => {
                deleteOptionElements();
                if (data.length > 0) {
                    data.forEach((city) => {
                    insertOptionElements(city.name);
                    });
                }
                });
        });

        input.addEventListener("keypress", event => {

        if (event.key === "Enter") {
            fetch(currentApiUrl + event.target.value)
            .then(response => response.json())
            .then(data => {
                const cityName = data.location.name;
                const currentData = data.current;
                const feelsLikeC = currentData.feelslike_c;
                const feelsLikeF = currentData.feelslike_f;
                const humidity = currentData.humidity;
                const uv = currentData.uv;
                const windKph = currentData.wind_kph;
                const windDir = currentData.wind_dir;

                fetch(`https://api.pexels.com/v1/search?query=${cityName}`, authorization)
                .then(response => response.json())
                .then(data => {
                    const currentCityImage = data.photos[0].src.landscape;

                    changeBackgroundImageTo(currentCityImage);
                });

                deleteWeatherData();
                insertWeatherData(feelsLikeC, feelsLikeF, cityName);
                insertAdditionalLocationData(humidity, uv, windKph, windDir);
                clearInputField();
            });
        }
        });
    });

window.addEventListener("load", _ => {
    input.value = "";
});
