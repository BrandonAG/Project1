// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';
// https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985
// 40f410cd-9102-4b7b-9aed-cdbbce23a985
var cityArray = [];
// Fetch the API data for current Air Quality
var getCurrentAirInfo = function() {
    var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(dataResult) {
                console.log(dataResult);
                console.log(dataResult.data.location.coordinates);
                displayAQIInformation(dataResult);

            });
        } else {
            alert("Error: " + response.statusText);
        }
    });

};


function searchButtonHandler(input) {
    console.log(input);
    var apiUrl = "https://api.opencagedata.com/geocode/v1/json?q=" +
        input + "&key=974cf3d56a9f45d58e79a7ec8b1f7842";
    // Geocode API - Open cage Data
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(geoData) {
                console.log(geoData)
                    //results[0].geometry.lat, results[0].geometry.lng
                var url = "http://api.airvisual.com/v2/nearest_city?lat=" +
                    geoData.results[0].geometry.lat + "&lon=" + geoData.results[0].geometry.lng + "&key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
                searchResult(url);
            });
        } else {
            alert("Error: " + response.statusText);
            // Check for problems
        }
    });


};

var searchResult = function(url) {
        fetch(url).then(function(response) {

            if (response.ok) {
                response.json().then(function(thisData) {
                    console.log(thisData)
                    var testingEl = document.getElementById("why");
                    var aqiBadgeElement = createBadge(thisData.data.current.pollution.aqius);
                    testingEl.innerHTML = "The AQI For Searched Region: " + aqiBadgeElement;
                    var location = thisData.data.city + ", " + thisData.data.state + ", " + thisData.data.country;
                    var myObj = {
                        name: location,
                        rating: "getRating()" // future concept of personal rating for risk assessment
                    };
                    cityArray.push(myObj);
                    saveSearch();
                });
            } else {
                alert("Error: " + response.statusText);
                // Check for problems
            }
        });
    }
    // Finds and saves the data needed from the API
var displayAQIInformation = function(results) {

    /* NOTE: This data is displayed this way (innerHTML) for testing purposes only - this way I can see my output.
    the plan is to build information objects that can be saved and accessed as needed. */
    var cityFormatted = results.data.city + ", " + results.data.state + ", " + results.data.country;
    var headerEl = document.getElementById("current-conditions-header");
    headerEl.innerHTML = "<div><h1>Ahoy, " + cityFormatted + "!</h1></div>";

    var contentEl = document.getElementById("content");
    var iconIdEl = results.data.current.weather.ic;
    var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";
    var imgCode = "<img src='" + link + "' alt='icon'>";

    var aqiBadgeElement = createBadge(results.data.current.pollution.aqius);
    var pollutantName = getPollutant(results);


    contentEl.innerHTML = "<div>" + imgCode + "</div><br><h3>Temp: " +
        convertToF(results.data.current.weather.tp) + "F" +
        "<br><br><div class ='center-align'><div>Current AQI (US):</div><div> " + aqiBadgeElement + "</div></div>" +
        "<br><div class='pollutants'>Primary Pollutant: " + pollutantName +
        "</div><br></h3><h6>This is the AirVisual App at work.</h6></div>";
    searchButtonHandler(cityFormatted); // This is just to show that the search function works,
    // we will link up the search input button instead of this function.
};


// Creates a badge using materialize that indicates the AQI with color coding
var createBadge = function(aqiValue) {
    var badgeCode = "<h3><a class='btn-floating btn-large waves-effect waves-light";

    if (aqiValue <= 50) {
        badgeCode += "green";
    } else if (aqiValue <= 100) {
        badgeCode += "yellow";
    } else if (aqiValue <= 150) {
        badgeCode += "orange";
    } else if (aqiValue <= 200) {
        badgeCode += "red";
    } else if (aqiValue <= 300) {
        badgeCode += "violet";
    } else if (aqiValue > 301) {
        badgeCode += "maroon";
    }
    badgeCode += "'>" + aqiValue + "</a></h3>";
    return badgeCode;
};

// The API uses Celsius - so we want to convert this to Fahrenheit

function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
};


var getPollutant = function(result) {
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

function saveSearch() {
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    console.log("search recorded");
    console.log(cityArray);
};

function loadSearch() {
    var savedSearches = JSON.parse(localStorage.getItem("cityArray"));

    if (savedSearches) {
        cityArray = savedSearches;
    } else { return false; }
    console.log("Search History Found...");

    cityArray = JSON.parse(JSON.stringify(savedSearches));
    console.log(cityArray);
    /* createHistory(); - a future function to build the search history panel */
};

// Calls loadSearch() to load the saved entries up as the page loads


getCurrentAirInfo();

loadSearch();