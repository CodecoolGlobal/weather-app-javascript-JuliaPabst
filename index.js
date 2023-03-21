
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