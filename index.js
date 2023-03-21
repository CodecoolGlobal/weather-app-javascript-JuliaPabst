const root = document.querySelector("#root");
const input = document.querySelector("input");
let sellectedCountry = 'Vienna';

const createFormWithInput = (cityName) => {
    const option = document.createElement("option");
    option.setAttribute("value", cityName);

    return option;
};

const insertOptionElement = (cityName) => {
    const cities = document.getElementById("cities");
    cities.appendChild(createFormWithInput(cityName));
};

const cityNames = cities.map(city => city.name);
cityNames.forEach(city => {
    insertOptionElement(city);
});

const createImage = (url) => {
    const img = document.createElement("img");
    img.src = url;

    root.appendChild(img);
};

const insertCelsius = (watherInCelsius, name, url) => {
    const countryName = document.createElement("h1");
    countryName.innerText = name;
    root.appendChild(countryName);

    createImage(url);

    const div = document.createElement("div");
    div.setAttribute("id", "celsius");
    div.innerText = `${watherInCelsius} °Celsius`

    root.appendChild(div);
};

fetch(`https://api.weatherapi.com/v1/current.json?key=ef3f93021b5549f6866100215232103&q=${sellectedCountry}`)
    .then(response => response.json())
    .then(data => {
        const image = "https:" + data.current.condition.icon

        insertCelsius(data.current.feelslike_c, data.location.name, image);

        input.addEventListener("keypress", event => {

            if(event.key === "Enter") {
                sellectedCountry = event.target.value;
                document.querySelector("h1").remove();
                document.querySelector("#celsius").remove();
                document.querySelector("img").remove();

                fetch(`https://api.weatherapi.com/v1/current.json?key=ef3f93021b5549f6866100215232103&q=${sellectedCountry}`)
                .then(response => response.json())
                .then(data => {
                    const image = "https:" + data.current.condition.icon

                    insertCelsius(data.current.feelslike_c, data.location.name, image);
                });
            }
        });

        // console.log(data.location.name);

        // console.log(data.current.feelslike_c);
    });

// // replace YOUR_API_KEY with your Weather API key
// const API_KEY = "ef3f93021b5549f6866100215232103";

// // construct the API URL for city search
// const API_URL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=*&format=JSON`;

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

window.addEventListener("load", event => {
    input.value = '';
});

window.addEventListener("click", event => {
    console.log(event.target);
});