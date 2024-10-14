import 'normalize-css';
import 'bootstrap-grid';
import './style.scss';
import 'animejs';

const shift = function(array) {
  let length = array.length - 1;
  let last = array[0];

  for (let i = 0; i < array.length - 1; i++)
    array[i] = array[i + 1]

  array[length] = last;
};

const submit = function() {
  let city = document.querySelector("input[name=\"search-field\"]").value;
  let key = "1077c60bc0c44c80b35131854242309";
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`, true);
  xhttp.send();

  xhttp.onload = function() {
    let response = JSON.parse(this.response)["current"];
    let tableTemp = document.querySelector(".temperature .weather-value");
    let cloudTemp = document.querySelector(".cloud .weather-value");
    let windTemp = document.querySelector(".windchill .weather-value");
    let feeling = document.querySelector(".feeling .weather-value");
    let windSpeed = document.querySelector(".windspeed .weather-value");
    let temp = JSON.stringify(response["temp_c"]);
    let cloud = JSON.stringify(response["cloud"]);
    let windChill = JSON.stringify(response["windchill_c"]);
    let feelslike = JSON.stringify(response["feelslike_c"]);
    let windSpeedValue = JSON.stringify(response["wind_kph"]);
    tableTemp.textContent = temp + "\t(C)";
    cloudTemp.textContent = cloud + "\t(C)";
    windTemp.textContent = windChill + "\t(С)";
    feeling.textContent = feelslike + "\t(C)";
    windSpeed.textContent = windSpeedValue + "\t(КМ/Ч)";
  }


  const list = document.querySelector(".weather-list");
  const firstItem = list.children[list.children.length - 1];
  firstItem.classList.add("active");
};

const activeInit = function() {
  submit();
  const list = document.querySelector(".weather-list");
  const firstItem = list.children[list.children.length - 1];
  firstItem.classList.add("active");
};

const weatherListFunc = function(event) {
  let list = event.target.closest(".weather-list").children;
  let indexes = [];
  let currentItem;
  let currentIndex;
  let prevItem;
  let prevIndex;

  for (let i = 0; i < list.length; i++)
    indexes.push(i);

  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("active")) {
      currentIndex = indexes[i];
      prevIndex = i - 1;
      break;
    }
  }

  if (currentIndex == indexes[0]) {
    shift(indexes);
    currentIndex = indexes[list.length - 1];
    prevIndex = indexes[list.length - 2];
  }

  currentItem = list[currentIndex];
  prevItem = list[prevIndex];

  currentItem.classList.remove("active");
  prevItem.classList.add("active");
};

const subButton = document.querySelector(".submit");
subButton.addEventListener("click", submit);

const weatherList = document.querySelector(".weather-list");
const weatherListItems = weatherList.children;

weatherList.addEventListener("click", weatherListFunc);
