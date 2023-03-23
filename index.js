const root = document.querySelector("#root");
const input = document.querySelector("input");
const chosenWeather = document.getElementById("chosen-weather");
const apiKey = "ef3f93021b5549f6866100215232103";
const searchApiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=`;
const currentApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
const datalistCities = document.getElementById("cities");
let selectedCity = 'Vie';
const pexelsApiKey = "uwcHOUHm37YDeAWCiRkUhKxaBNBKN0HvGcxtZlb1Y7h7EfGRX7PK0dbK";
const backgroundImg = document.querySelector("#backgroundImg");
const body = document.querySelector("body");


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

const insertWeatherData = (weatherInCelsius, weatherInFahrenheit, name, url) => {
    
    createImage(url);
    
    const countryName = document.createElement("h1");
    countryName.innerText = name;
    countryName.setAttribute("class", "location");
    chosenWeather.appendChild(countryName);

    const temperatureInfo = document.createElement("div");
    temperatureInfo.setAttribute("id", "temps");
    temperatureInfo.setAttribute("class", "temp");
    temperatureInfo.innerText = `${weatherInCelsius}° C | ${weatherInFahrenheit}° F`;

    chosenWeather.appendChild(temperatureInfo);

};
const insertAdditionalLocationData = (humidity, uv, windSpeed, windDirection) => {
    const otherInfo = document.createElement("div");
    otherInfo.setAttribute("id", "other");
    otherInfo.setAttribute("class", "otherInfo");
    otherInfo.innerText = `Humidity: ${humidity} | UV: ${uv} | Wind: ${windSpeed}km/h (${windDirection})`;

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
                    datalistCities.replaceChildren();
                    if( data.length > 0) {
                        data.forEach(city => {
                            insertOptionElement(city.name);
                        });
                    }
                })
        });

        input.addEventListener("keypress", event => {
            if(event.key === "Enter") {
                let cityName;
                fetch(currentApiUrl + event.target.value)
                    .then(response => response.json())
                    .then(data => {
                        cityName = data.location.name; 

                        const image = "https:" + data.current.condition.icon;

                        fetch(`https://api.pexels.com/v1/search?query=${cityName}`, {headers:{Authorization: pexelsApiKey}})
                            .then(response => response.json())
                            .then(data => {
                                const cityImage = data.photos[0].src.landscape; 
                                console.log(data);
        
                                console.log(cityImage);
                                body.setAttribute("style", `background-image: url(${cityImage})`);
                                
                                // const img = document.createElement("img");
                                // img.setAttribute("src", cityImage);
                                // img.setAttribute("class", "bg-img");
                                // backgroundImg.appendChild(img);
                        });

                        chosenWeather.replaceChildren();
                        insertWeatherData(data.current.feelslike_c, data.current.feelslike_f, data.location.name, image);
                        insertAdditionalLocationData(data.current.humidity, data.current.uv, data.current.wind_kph, data.current.wind_dir);
                    })

            }
        });
    });


// // replace YOUR_API_KEY with your Weather API key


// // construct the API URL for city search


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


window.addEventListener("load", event => {
    input.value = '';
});