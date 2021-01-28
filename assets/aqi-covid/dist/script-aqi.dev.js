"use strict";

// https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985
// 40f410cd-9102-4b7b-9aed-cdbbce23a985
var aqiArray = [];

var getCurrentAirInfo = function getCurrentAirInfo() {
  var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (dataResult) {
        console.log(dataResult);
        createAPIObject(dataResult, true);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}; // searchAQIResult is the function to call from script-search taking in latitude and longitude parameters


var searchAQIResult = function searchAQIResult(lat, lng) {
  var url = "http://api.airvisual.com/v2/nearest_city?lat=" + lat + "&lon=" + lng + "&key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (thisData) {
        console.log(thisData);
        createAPIObject(thisData, false);
        console.log(aqiArray);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var createAPIObject = function createAPIObject(results, isCurrent) {
  // This will work with HTML and CSS to display the variables
  var cityFormatted = results.data.city + ", " + results.data.state + ", " + results.data.country;
  var iconIdEl = results.data.current.weather.ic;
  var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";
  var imgCode = "<img src='" + link + "' alt='icon'>";
  var aqi = results.data.current.pollution.aqius;
  var pollutantName = getPollutant(results);
  var temp = convertToF(results.data.current.weather.tp);
  var myObj = {
    name: cityFormatted,
    aqi: aqi,
    pollutant: pollutantName,
    temperature: temp,
    img: imgCode // weather icon

  };

  if (isCurrent) {
    displayCurrent(myObj);
  } else {
    displaySearched(myobj);
  }

  console.log(myObj);
  aqiArray.push(myObj);
  console.log(aqiArray);
};

function convertToF(celsius) {
  return Math.trunc(celsius * 9 / 5 + 32);
}

;

var getPollutant = function getPollutant(result) {
  // Turn pollutant code into a human readable string
  var pollutantCode = result.data.current.pollution.mainus;
  var pollutantName = "";

  if (pollutantCode === "p2") {
    pollutantName = "PM2.5";
  } else if (pollutantCode === "p1") {
    pollutantName = "PM10";
  } else if (pollutantCode === "o3") {
    pollutantName = "Ozone O3";
  } else if (pollutantCode === "n2") {
    pollutantName = "Nitrogen dioxide NO2";
  } else if (pollutantCode === "s2") {
    pollutantName = "Sulfur dioxide SO2";
  } else if (pollutantCode === "co") {
    pollutantName = "Carbon monoxide CO";
  } else {
    pollutantName = "ERROR - invalid pollutant code";
  }

  return pollutantName;
};
/* Test Code:
 searchAQIResult(1, 2);
getCurrentAirInfo();*/