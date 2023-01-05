let now = new Date();

let p = document.querySelector("#date");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

p.innerHTML = `${day} ${hours}:${minutes}`;

let submitButton = document.querySelector("#submitButton");
function handleClick(e) {
  e.preventDefault();
  let city = document.querySelector("#city");
  let searchField = document.querySelector("#searchField");
  let currentCity = searchField.value;
  city.innerHTML = currentCity;

  let apiKey = "714447bdb332043569d25953a6bac62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then((res) => showTemperature(res));
}
submitButton.addEventListener("click", (e) => handleClick(e));

function showTemperature(response) {
  console.log(response);
  let cityTemperture = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = `${cityTemperture}`;
  let currentLocation = response.data.name;
  let locationElement = document.querySelector("#city");
  locationElement.innerHTML = currentLocation;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "714447bdb332043569d25953a6bac62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then((res) => showTemperature(res));
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
  event.preventDefault();
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentPosition);
